export const statuses: string[] = ['read', 'received', 'sent', 'pending', 'error']

/**
 * Преобразует статус сообщения в соответствующий CSS-класс для стилизации
 * 
 * @param status - Статус сообщения ('read', 'received', 'sent' или другое значение)
 * @returns CSS-класс для статуса ('status--read', 'status--received') или пустую строку для остальных случаев
 * 
 * @example
 * getStatus('read') // returns 'status--read'
 * getStatus('received') // returns 'status--received'
 * getStatus('sent') // returns ''
 * getStatus('unknown') // returns ''
 */
export const getStatus = (status: string): string => {
  switch (status) {
    case 'read':
      return 'status--read'
    case 'received':
      return 'status--received'
    case 'pending':
      return 'status--pending'
    case 'error':
      return 'status--error'
    default:
      return ''
  }
}

export const getStatusTitle = (status: string, statusMsg?: string): string => {
  let baseTitle = ''
  switch (status) {
    case 'pending':
      baseTitle = 'Отправляется'
      break
    case 'sent':
      baseTitle = 'Отправлено'
      break
    case 'received':
      baseTitle = 'Доставлено'
      break
    case 'read':
      baseTitle = 'Прочитано'
      break
    case 'error':
      baseTitle = 'Ошибка'
      break
    default:
      return ''
  }
  const details = statusMsg?.trim()
  return details ? `${baseTitle}: ${details}` : baseTitle
}
