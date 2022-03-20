import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import PortableText from '@sanity/block-content-to-react';
import { Event } from '../../lib/types';
import { imageBuilder } from '../../lib/sanity';
import Timezones from '@/lib/completeTimezones.json';

import { Card } from '../Card';

const serializers = {
  marks: {
    // eslint-disable-next-line react/display-name
    link: ({ mark, children }) => {
      const { blank, href } = mark;
      return blank ? (
        <a
          href={href}
          className="text-informational"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        <a className="text-informational" href={href}>
          {children}
        </a>
      );
    },
  },
};
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

function urlToLink(url) {
  if (!url) {
    return '';
  }
  return `<a class="text-informational" href=${url}> ${url} </a>`;
}

function textPlainToHtml(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text
    .replace(urlRegex, urlToLink) // replace url with link
    .replace(/\n/g, '<br/>') // replace new lines with <br/>
    .replace(/\*\*(.*)\*\*/g, '<b>$1</b>') // bold
    .replace(/\*(.*)\*/g, '<i>$1</i>'); // italic
}

const EventPreview: React.FC<EventPreviewProps> = ({ event, past = false }) => {
  const endDate = new Date(event.date);
  endDate.setHours(endDate.getHours() + 1);

  const calendar = {
    title: `${event.title} - FrontendCafé`,
    description:
      event.origin !== 'Discord'
        ? toPlainText(event.description).replace(/[#]+/g, '%23')
        : event.description,
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
        {event.origin !== 'Discord' ? (
          <Card.Image
            src={imageBuilder.image(event.cover.src).url()}
            alt={event.cover.alt || event.title}
            width={400}
            height={200}
            blurDataURL={`${imageBuilder.image(event.cover.src).url()}`}
          />
        ) : (
          <Card.Image
            src={event.cover.src}
            alt={event.cover.alt || event.title}
            width={400}
            height={200}
            blurDataURL={`${event.cover.src}`}
          />
        )}

        <Card.Headline>{event.category.name}</Card.Headline>
        <Card.Title>{event.title}</Card.Title>
      </Card.Header>

      <Card.Body>
        {!past && (
          <div className="flex flex-col">
            <Card.Paragraph>
              {format(new Date(event.date), 'd  MMMM - HH:mm ', {
                locale: es,
              })}
              hrs
            </Card.Paragraph>
            <Card.Paragraph className="p-0 text-xs font-light text-quaternary">
              Horario en tu ubicación actual
            </Card.Paragraph>
          </div>
        )}
        <div className="text-secondary py-2">
          {event.origin !== 'Discord' ? (
            <PortableText
              blocks={event.description}
              serializers={serializers}
            />
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: textPlainToHtml(event.description),
              }}
            ></p>
          )}
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
