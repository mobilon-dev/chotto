import {formatTimestamp, insertDaySeparators, sortByTimestamp} from '@/functions';

export const transformToFeed = (objects: Array<{direction: string; timestamp?: number}>, outPreviousDay: number | null = null) => {
  // а. сортировка по timestamp
  const filteredObjects = objects.filter(obj => obj.timestamp !== undefined) as Array<{direction: string; timestamp: number}>;
  const messages1 = sortByTimestamp(filteredObjects) as Array<{direction: string; timestamp: number}>;

  // б. переформатирование
  const messages2 = messages1.map((m: {direction: string; timestamp: number}) => {
    return {
      ...m,
      position: m.direction === 'outgoing' ? 'right' : 'left',
      time: formatTimestamp(m.timestamp.toString()),
    };
  });

  // в. вставка временных отсечек
  const messages3 = insertDaySeparators(messages2, outPreviousDay);
  return messages3;
}
