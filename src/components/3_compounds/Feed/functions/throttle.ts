export function throttle(callee: (...args: unknown[]) => void, timeout: number) {
  let timer: NodeJS.Timeout | null = null

  return function perform(...args: unknown[]) {
    if (timer) return

    timer = setTimeout(() => {
      callee(...args)

      if (timer) clearTimeout(timer)
      timer = null
    }, timeout)
  }
}

