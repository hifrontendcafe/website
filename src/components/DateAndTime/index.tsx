'use client';

import { formatDateTime } from '@/lib/formatDateTime';
interface Props {
  dateString: Date;
}

function DateAndTime({ dateString }: Props) {
  const { isToday, date, time } = formatDateTime(dateString);

  return (
    <p className="hidden lg:block text-sm text-tertiary">
      {isToday ? 'Hoy' : 'El'}
      <time className="font-medium" dateTime={dateString.toString()}>
        {date}
      </time>
      a las
      <time className="font-medium" dateTime={dateString.toString()}>
        {time}
      </time>
    </p>
  );
}

export default DateAndTime;
