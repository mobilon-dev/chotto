/**
 * Вставляет разделители дней между сообщениями в хронологическом порядке
 * 
 * Функция анализирует временные метки сообщений и добавляет специальные объекты-разделители
 * перед сообщениями из нового дня. Разделители помогают визуально группировать сообщения по датам.
 * 
 * @param messages - Массив объектов с полем timestamp (Unix timestamp в секундах)
 * @param outPreviousDay - Опциональный timestamp предыдущего дня для учета истории.
 *                         Используется, чтобы не вставлять разделитель в начале, если это тот же день
 * @returns Массив, содержащий исходные сообщения и вставленные разделители дней
 * 
 * Формат разделителя дня:
 * ```ts
 * {
 *   isSeparator: true,
 *   day: string,        // "Сегодня" | "Вчера" | локализованная дата
 *   text: string,       // то же, что и day
 *   type: 'system.date'
 * }
 * ```
 * 
 * Метки дней:
 * - "Сегодня" - для сообщений текущего дня
 * - "Вчера" - для сообщений вчерашнего дня
 * - Локализованная дата (через toLocaleDateString()) - для более старых дат
 * 
 * @example
 * const messages = [
 *   { timestamp: 1727027959, text: 'Привет' },      // сегодня
 *   { timestamp: 1726916359, text: 'Как дела?' },   // вчера
 *   { timestamp: 1726830251, text: 'Хорошо' }       // позавчера
 * ];
 * const result = insertDaySeparators(messages);
 * // Результат будет содержать разделители между днями:
 * // [
 * //   { isSeparator: true, day: 'Сегодня', text: 'Сегодня', type: 'system.date' },
 * //   { timestamp: 1727027959, text: 'Привет' },
 * //   { isSeparator: true, day: 'Вчера', text: 'Вчера', type: 'system.date' },
 * //   { timestamp: 1726916359, text: 'Как дела?' },
 * //   { isSeparator: true, day: '20.09.2024', text: '20.09.2024', type: 'system.date' },
 * //   { timestamp: 1726830251, text: 'Хорошо' }
 * // ]
 */
export const insertDaySeparators = (messages: { timestamp: number }[], outPreviousDay: number | null = null) => {
  const result: unknown[] = [];
  let previousDay: string | null = null;

  const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  const now = new Date();
  const todayStart = startOfDay(now);

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStart = startOfDay(yesterday);

  const getDayLabel = (timestamp: number) => {
    const messageDate = new Date(timestamp * 1000);
    const messageStart = startOfDay(messageDate);

    if (messageStart === todayStart) {
      return 'Сегодня';
    } else if (messageStart === yesterdayStart) {
      return 'Вчера';
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  if (outPreviousDay !== null) {
    previousDay = getDayLabel(outPreviousDay);
  }

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const currentDay = getDayLabel(message.timestamp);

    if (currentDay !== previousDay) {
      result.push({
        isSeparator: true,
        day: currentDay,
        text: currentDay,
        type: 'system.date',
      });
      previousDay = currentDay;
    }
    result.push(message);
  }
  return result;
};

// const messages = [
//   {timestamp: '1727027959',},
//   {timestamp: '1726916359',},
//   {timestamp: '1726830251',},
//   {timestamp: '1726829959',},
//   {timestamp: '1726743559',},
// ];

// console.log('t', insertDaySeparators(messages));
