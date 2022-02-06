import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import BlockContent from '@sanity/block-content-to-react';
import { Event } from '../../lib/types';
import { imageBuilder } from '../../lib/sanity';
import Timezones from '@/lib/completeTimezones.json';

import { Card } from '../Card';

interface EventPreviewProps {
  event: Event;
  past?: boolean;
}

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

const EventPreview: React.FC<EventPreviewProps> = ({ event, past = false }) => {
  const endDate = new Date(event.date);
  endDate.setHours(endDate.getHours() + 1);

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
          <Card.Paragraph>
            {format(new Date(event.date), 'd  MMMM - HH:mm ', {
              locale: es,
            })}
            hrs
            <span className="inline-block text-xs font-light text-gray-400">
              Horario en tu ubicación actual
            </span>
          </Card.Paragraph>
        )}
        <div className="text-gray-300">
          <BlockContent blocks={event.description} />
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
