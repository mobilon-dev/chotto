import { ref, watch, nextTick, type Ref } from 'vue'
import { calculatePanelPosition, calculateFixedPanelPosition } from './usePositioning'

/**
 * Композабл для управления панелями реакций (быстрые реакции и полный picker)
 */
export function useReactionsPanel(
  quickEmojis: Ref<readonly string[]>,
  addButtonRef: Ref<HTMLButtonElement | null>
) {
  const isQuickReactionsOpen = ref(false)
  const isFullPickerOpen = ref(false)
  const pickerRef = ref<HTMLElement | null>(null)
  const quickReactionsRef = ref<HTMLElement | null>(null)
  
  const quickPanelStyle = ref<Record<string, string>>({})
  const pickerStyle = ref<Record<string, string>>({})

  // Вспомогательные флаги для hover-режима
  let isMouseOverPicker = false
  let isMouseOverQuickPanel = false
  let isMouseOverButton = false

  // Обновляем позицию панели быстрых реакций при открытии
  watch(isQuickReactionsOpen, async (isOpen) => {
    if (isOpen) {
      const estimatedWidth = quickEmojis.value.length * 40 + 40 // Примерная ширина
      const style = await calculatePanelPosition(quickReactionsRef.value, addButtonRef.value, estimatedWidth)
      quickPanelStyle.value = style
    }
  })

  // Обновляем позицию полного пикера при открытии
  watch(isFullPickerOpen, async (isOpen) => {
    if (isOpen) {
      // Ждем, пока элемент отрендерится через Teleport
      await nextTick()
      // Ждем, пока элемент появится в DOM (Teleport может занять время)
      let attempts = 0
      const maxAttempts = 20
      while (!pickerRef.value && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 10))
        attempts++
      }
      
      // Дополнительный nextTick для гарантии, что элемент полностью отрендерился
      await nextTick()
      
      // Первый расчет позиции (может быть неточным, если элемент еще не имеет размеров)
      const estimatedWidth = 350 // Примерная ширина EmojiPicker
      let style = await calculateFixedPanelPosition(pickerRef.value, addButtonRef.value, estimatedWidth)
      pickerStyle.value = style
      
      // Ждем, пока элемент получит правильные размеры, затем пересчитываем позицию
      if (pickerRef.value) {
        // Ждем, пока элемент получит размеры
        let sizeAttempts = 0
        const maxSizeAttempts = 10
        while (pickerRef.value.offsetWidth === 0 && sizeAttempts < maxSizeAttempts) {
          await new Promise(resolve => setTimeout(resolve, 10))
          sizeAttempts++
        }
        
        // Пересчитываем позицию с правильными размерами
        await nextTick()
        style = await calculateFixedPanelPosition(pickerRef.value, addButtonRef.value, pickerRef.value.offsetWidth || estimatedWidth)
        pickerStyle.value = style
      }
    }
  })

  function openQuickPanel() {
    isQuickReactionsOpen.value = true
    isFullPickerOpen.value = false
  }

  function closeQuickPanel() {
    isQuickReactionsOpen.value = false
  }

  async function openFullPicker() {
    isQuickReactionsOpen.value = false
    await nextTick()
    isFullPickerOpen.value = true
  }

  function closeFullPicker() {
    isFullPickerOpen.value = false
  }

  function handleQuickPanelMouseEnter() {
    isMouseOverQuickPanel = true
  }

  function handleQuickPanelMouseLeave() {
    isMouseOverQuickPanel = false
    setTimeout(() => {
      if (!isMouseOverButton && !isMouseOverQuickPanel) {
        isQuickReactionsOpen.value = false
      }
    }, 150)
  }

  function handlePickerMouseEnter() {
    isMouseOverPicker = true
  }

  function handlePickerMouseLeave() {
    isMouseOverPicker = false
    setTimeout(() => {
      if (!isMouseOverButton && !isMouseOverPicker) {
        isFullPickerOpen.value = false
      }
    }, 150)
  }

  function handleButtonMouseEnter() {
    isMouseOverButton = true
  }

  function handleButtonMouseLeave() {
    isMouseOverButton = false
  }

  // Закрытие по клику вне панели
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node
    
    if (isQuickReactionsOpen.value) {
      if (
        quickReactionsRef.value &&
        addButtonRef.value &&
        !quickReactionsRef.value.contains(target) &&
        !addButtonRef.value.contains(target)
      ) {
        isQuickReactionsOpen.value = false
      }
    }
    
    if (isFullPickerOpen.value) {
      if (
        pickerRef.value &&
        addButtonRef.value &&
        !pickerRef.value.contains(target) &&
        !addButtonRef.value.contains(target)
      ) {
        isFullPickerOpen.value = false
      }
    }
  }

  return {
    isQuickReactionsOpen,
    isFullPickerOpen,
    pickerRef,
    quickReactionsRef,
    quickPanelStyle,
    pickerStyle,
    openQuickPanel,
    closeQuickPanel,
    openFullPicker,
    closeFullPicker,
    handleQuickPanelMouseEnter,
    handleQuickPanelMouseLeave,
    handlePickerMouseEnter,
    handlePickerMouseLeave,
    handleButtonMouseEnter,
    handleButtonMouseLeave,
    handleClickOutside,
  }
}

