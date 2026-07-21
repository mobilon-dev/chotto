import { ref, watch, nextTick, type Ref } from 'vue'
import {
  calculatePanelPosition,
  calculateFixedPanelPosition,
  calculatePickerPositionAboveQuickPanel,
} from './usePositioning'

/**
 * Композабл для управления панелями реакций (быстрые реакции и полный picker)
 */
export function useReactionsPanel(
  quickEmojis: Ref<readonly string[]>,
  messageRef: Ref<HTMLElement | null>
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
  let isMouseOverMessage = false
  let openQuickPanelTimer: ReturnType<typeof setTimeout> | null = null
  let closePanelsTimer: ReturnType<typeof setTimeout> | null = null

  // Обновляем позицию панели быстрых реакций при открытии (Teleport → body)
  watch(isQuickReactionsOpen, async (isOpen) => {
    if (isOpen) {
      await nextTick()

      let attempts = 0
      while (!quickReactionsRef.value && attempts < 20) {
        await new Promise(resolve => setTimeout(resolve, 10))
        attempts++
      }

      attempts = 0
      while (quickReactionsRef.value?.offsetWidth === 0 && attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 10))
        attempts++
      }

      const estimatedWidth = quickReactionsRef.value?.offsetWidth || quickEmojis.value.length * 40 + 40
      const style = await calculatePanelPosition(quickReactionsRef.value, messageRef.value, estimatedWidth)
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

      const estimatedWidth = 350
      const calculatePickerPosition = () => {
        if (quickReactionsRef.value && isQuickReactionsOpen.value) {
          return calculatePickerPositionAboveQuickPanel(
            pickerRef.value,
            quickReactionsRef.value,
            messageRef.value,
            estimatedWidth
          )
        }
        return calculateFixedPanelPosition(pickerRef.value, messageRef.value, estimatedWidth)
      }

      let style = await calculatePickerPosition()
      pickerStyle.value = style

      if (pickerRef.value) {
        let sizeAttempts = 0
        const maxSizeAttempts = 10
        while (pickerRef.value.offsetWidth === 0 && sizeAttempts < maxSizeAttempts) {
          await new Promise(resolve => setTimeout(resolve, 10))
          sizeAttempts++
        }

        await nextTick()
        style = await calculatePickerPosition()
        pickerStyle.value = style
      }
    }
  })

  function clearOpenQuickPanelTimer() {
    if (openQuickPanelTimer) {
      clearTimeout(openQuickPanelTimer)
      openQuickPanelTimer = null
    }
  }

  function clearClosePanelsTimer() {
    if (closePanelsTimer) {
      clearTimeout(closePanelsTimer)
      closePanelsTimer = null
    }
  }

  function scheduleClosePanels() {
    clearClosePanelsTimer()
    closePanelsTimer = setTimeout(() => {
      if (!isMouseOverMessage && !isMouseOverQuickPanel && !isMouseOverPicker) {
        isQuickReactionsOpen.value = false
        isFullPickerOpen.value = false
      }
    }, 150)
  }

  function openQuickPanel() {
    clearClosePanelsTimer()
    isQuickReactionsOpen.value = true
  }

  function closeQuickPanel() {
    clearOpenQuickPanelTimer()
    clearClosePanelsTimer()
    isQuickReactionsOpen.value = false
  }

  async function openFullPicker() {
    // Отменяем отложенные open/close, иначе openQuickPanel через 1с
    // закроет только что открытый picker (isFullPickerOpen = false раньше стоял в openQuickPanel)
    clearOpenQuickPanelTimer()
    clearClosePanelsTimer()
    isMouseOverQuickPanel = true
    isFullPickerOpen.value = true
  }

  function closeFullPicker() {
    clearClosePanelsTimer()
    isFullPickerOpen.value = false
  }

  function handleQuickPanelMouseEnter() {
    isMouseOverQuickPanel = true
    clearClosePanelsTimer()
  }

  function handleQuickPanelMouseLeave() {
    isMouseOverQuickPanel = false
    scheduleClosePanels()
  }

  function handlePickerMouseEnter() {
    isMouseOverPicker = true
    clearClosePanelsTimer()
  }

  function handlePickerMouseLeave() {
    isMouseOverPicker = false
    scheduleClosePanels()
  }

  function handleMessageMouseEnter() {
    isMouseOverMessage = true
    clearClosePanelsTimer()
    clearOpenQuickPanelTimer()

    // Если панели уже открыты — не перезапускаем таймер,
    // иначе через 1с openQuickPanel снова вызовется и может сбить picker
    if (isQuickReactionsOpen.value || isFullPickerOpen.value) return

    openQuickPanelTimer = setTimeout(() => {
      if (!isMouseOverMessage) return
      openQuickPanel()
    }, 1000)
  }

  function handleMessageMouseLeave() {
    isMouseOverMessage = false
    clearOpenQuickPanelTimer()
    scheduleClosePanels()
  }

  // Закрытие по клику вне панели
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node

    const isInsideQuick = quickReactionsRef.value?.contains(target)
    const isInsidePicker = pickerRef.value?.contains(target)
    const isInsideMessage = messageRef.value?.contains(target)

    if (isQuickReactionsOpen.value && !isInsideQuick && !isInsideMessage && !isInsidePicker) {
      isQuickReactionsOpen.value = false
      isFullPickerOpen.value = false
    }

    if (isFullPickerOpen.value && !isInsidePicker && !isInsideQuick && !isInsideMessage) {
      isFullPickerOpen.value = false
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
    handleMessageMouseEnter,
    handleMessageMouseLeave,
    handleQuickPanelMouseEnter,
    handleQuickPanelMouseLeave,
    handlePickerMouseEnter,
    handlePickerMouseLeave,
    handleClickOutside,
  }
}
