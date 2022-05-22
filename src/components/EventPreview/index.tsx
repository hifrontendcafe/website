import { useMemo } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { Event } from '../../lib/types';
import { imageBuilder } from '../../lib/sanity';
import Timezones from '@/lib/completeTimezones.json';
import Image from 'next/image';
import RichText from '@/components/RichText';

import { Card } from '../Card';
import type { PortableTextReactComponents } from '@portabletext/react';

const components: Partial<PortableTextReactComponents> = {
  block: {
    // eslint-disable-next-line react/display-name
    normal: ({ children }) => <p className="my-2 text-base">{children}</p>,
  },
};
interface EventPreviewProps {
  event: Event;
  past?: boolean;
  flag?: string;
}

const formatEventDate = (date: string | Date) => {
  return format(new Date(date), 'd  MMMM HH:mm ', { locale: es });
};

function toPlainText(blocks) {
  return blocks
    ?.map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children?.map((child) => child.text).join('');
    })
    .join('\n\n');
}

const EventPreview: React.FC<EventPreviewProps> = ({
  event,
  past = false,
  flag,
}) => {
  const endDate = useMemo(() => {
    const date = event.endDate ? new Date(event.endDate) : new Date(event.date);

    if (!event.endDate) date.setHours(date.getHours() + 1);

    return date;
  }, [event.endDate, event.date]);

  const calendar = {
    title: `${event.title} - FrontendCafé`,
    description: toPlainText(event.description).replace(/[#]+/g, '%23'),
    location: 'FrontendCafé Discord',
    startTime: new Date(event.date),
    endTime: endDate,
  };

  const AddToCalendar = ({ event }) => {
    const getTimezone = () => {
      const timezone = Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone.split('/')[
        Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').length - 1 // Crotada porque por alguna razón ".at is not a function" 🙄
      ];
      return (
        timezone && Timezones.find((tz) => tz.tzCode.includes(timezone))?.tzCode
      );
    };

    const formatedStartDatetime = new Date(event.startTime)
      .toISOString()
      .replace(/[-:.]/g, '');

    const formatedEndDatetime = new Date(event.endTime)
      .toISOString()
      .replace(/[-:.]/g, '');

    const googleCalendarURL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${
      event.title
    }&dates=${formatedStartDatetime}/${formatedEndDatetime}&details=${
      event.description
    }&location=${event.location}&trp=true&ctz=${getTimezone()}`;

    return (
      <Card.SecondaryAction href={googleCalendarURL}>
        Añadir a calendario
      </Card.SecondaryAction>
    );
  };

  return (
    <Card>
      <Card.Header>
        <Card.Image
          src={imageBuilder.image(event.cover.src).url()}
          alt={event.cover.alt || event.title}
          width={400}
          height={200}
          blurDataURL={`${imageBuilder.image(event.cover.src).url()}`}
        />

        <Card.Headline>{event.category.name}</Card.Headline>
        <Card.Title>{event.title}</Card.Title>
      </Card.Header>

      <Card.Body>
        {!past && (
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <Card.Paragraph className="text-sm">
                {formatEventDate(event.date)}hrs
                {event.endDate && ` / ${formatEventDate(endDate)}hrs`}
              </Card.Paragraph>

              {flag && (
                <div className="flex items-center justify-center">
                  <Image
                    className="rounded-full"
                    src={flag}
                    height="15"
                    objectFit="cover"
                    width="15"
                    alt={flag}
                  />
                </div>
              )}
            </div>
            <Card.Paragraph className="p-0 text-xs font-light text-quaternary">
              {!flag && 'Horario en tu ubicación actual'}
            </Card.Paragraph>
          </div>
        )}
        <div className="py-2 text-secondary">
          <div className="!text-base">
            <RichText
              components={components}
              value={event.description as any}
            />
          </div>
        </div>
      </Card.Body>

      <Card.Actions>
        {past && event.recording && (
          <Card.PrimaryAction href={event.recording}>
            Ver grabación
          </Card.PrimaryAction>
        )}
        {!past && <AddToCalendar event={calendar} />}
      </Card.Actions>
    </Card>
  );
};

export default EventPreview;
