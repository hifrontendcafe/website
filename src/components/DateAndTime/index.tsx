'use client';

import { formatDateTime } from '@/lib/formatDateTime';
import { type ComponentProps } from 'react';
interface Props extends ComponentProps<'p'> {
  dateString: Date;
}

function DateAndTime({ dateString, ...props }: Props) {
  const { isToday, date, time } = formatDateTime(dateString);

  return (
    <p {...props}>
      {isToday ? 'Hoy' : 'El próximo'}
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
