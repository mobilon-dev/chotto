import { customRef } from 'vue'

function useDelayDebouncedRef(value: unknown, delay = 500) {
  let timeout: number 
  return customRef((track, trigger) => {
    return {
      get() {
        track() // подпишемся на чтение
        return value
      },
      set(newValue) {
          clearTimeout(timeout)
          timeout = window.setTimeout(() => {
            value = newValue
            trigger() // уведомим, что значение изменилось
          }, delay)
        
      }
    }
  })
}

export { useDelayDebouncedRef }
export default useDelayDebouncedRef