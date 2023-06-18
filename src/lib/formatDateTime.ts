import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import esLocale from 'date-fns/locale/es';

export function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  const options = {
    locale: esLocale,
  };

  return {
    day: format(date, ' d ', options),
    month: format(date, ' MMM ', options),
    date: format(date, ' E, d MMM ', options),
    time: format(date, ' h:mm aaaa ', options),
    isToday: isToday(date),
  };
}
