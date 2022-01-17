import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import BlockContent from '@sanity/block-content-to-react';
import { Event } from '../../lib/types';
import { imageBuilder } from '../../lib/sanity';
import Timezones from '@/lib/completeTimezones.json';
import Image from 'next/image';
import Link from 'next/link';

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
      <Link href={googleCalendarURL}>
        <a
          target="_blank"
          rel="noreferrer"
          className="mt-auto text-center btn btn-primary"
        >
          Añadir a calendario
        </a>
      </Link>
    );
  };

  return (
    <div>
      <div className="flex flex-col items-start h-full border-2 rounded-md shadow-lg bg-coolGray-900 border-coolGray-600">
        <div className="w-full p-4">
          <Image
            src={imageBuilder.image(event.cover.src).url()}
            alt={event.cover.alt || event.title}
            width={316}
            height={156}
            placeholder="blur"
            blurDataURL={`${imageBuilder.image(event.cover.src).url()}`}
          />
        </div>
        <div
          className={`flex-grow p-4 pt-0 flex flex-col ${
            past && !event.recording
              ? 'opacity-60 transition-opacity duration-150 ease-in-out'
              : ''
          }`}
        >
          <div className="flex justify-between w-full">
            <h2 className="text-sm font-medium tracking-widest text-primary title-font">
              {event.category.name}
            </h2>
          </div>
          <h1 className="mb-3 text-xl font-medium leading-tight text-coolGray-100 title-font">
            {event.title}
          </h1>
          {!past && (
            <p className="font-medium break-all text-coolGray-200 title-font ">
              {format(new Date(event.date), 'd  MMMM - HH:mm ', {
                locale: es,
              })}
              hrs
              <span className="inline-block text-xs font-light text-coolGray-400">
                Horario en tu ubicación actual
              </span>
            </p>
          )}
          <div className={`mt-2 mb-6 text-coolGray-300`}>
            <BlockContent blocks={event.description} />
          </div>
          {past && event.recording && (
            <Link href={event.recording}>
              <a
                className="mt-auto text-center btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Ver grabación
              </a>
            </Link>
          )}
          {!past && <AddToCalendar event={calendar} />}
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
