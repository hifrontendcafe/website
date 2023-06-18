'use client';

import { formatDateTime } from '@/lib/formatDateTime';
import { type ComponentProps } from 'react';

interface Props extends ComponentProps<'p'> {
  dateString: string;
}

function DateWidget({ dateString, ...props }: Props) {
  const { month, day, time, isToday } = formatDateTime(dateString);

  return (
    <p {...props}>
      <time
        className="rounded-xl border-zinc-400 border py-2 px-5 block text-lg text-center capitalize"
        dateTime={dateString.toString()}
      >
        {isToday ? 'Hoy' : month}
        <br />
        {day}
      </time>
      <time
        className="mt-2 block text-center mx-auto text-tertiary text-sm whitespace-nowrap"
        dateTime={dateString.toString()}
      >
        {time}
      </time>
    </p>
  );
}

export default DateWidget;
