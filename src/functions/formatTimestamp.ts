/**
 * Форматирует Unix timestamp в читаемое представление времени относительно текущего момента
 * 
 * @param timestamp - Unix timestamp в секундах в виде строки
 * @returns Форматированная строка времени или undefined, если timestamp пустой
 * 
 * Формат возвращаемого значения зависит от давности события:
 * - "Только что" - если прошло меньше секунды
 * - "X секунды назад" - если прошло меньше минуты
 * - "X минуты назад" - если прошло меньше часа
 * - "X часа назад" - если прошло меньше суток
 * - "X дня назад" - если прошло от 1 до 30 дней
 * - Дата в формате "dd.mm.yyyy" (ru-RU) - если прошло больше 30 дней
 * 
 * @example
 * formatTimestamp('1697558400') // может вернуть "5 минут назад" или "2 дня назад"
 * formatTimestamp('') // returns undefined
 * formatTimestamp('1609459200') // returns "01.01.2021" (если прошло больше месяца)
 */
export function formatTimestamp(timestamp: string) {
  if(!timestamp || timestamp === '') return;

  const date: number = + new Date(Number(timestamp) * 1000);
  const now: number = + new Date();
  // console.log('date', timestamp, date, now)

  // Проверяем, сколько времени прошло
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  // Выбираем формат времени в зависимости от времени прошедшего
  if (days > 30) {
    return new Date(date).toLocaleDateString("ru-RU"); // Если больше месяца, показываем только дату
  } else if (days > 0) {
    return `${days} ${days === 1 ? 'день' : 'дня'} назад`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'час' : 'часа'} назад`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'минута' : 'минуты'} назад`;
  } else if (seconds > 0) {
    return `${seconds} ${seconds === 1 ? 'секунда' : 'секунды'} назад`;
  } else {
    return 'Только что';
  }
}
