import { useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import BlockContent from '@sanity/block-content-to-react';
import { Event } from '../../lib/types';
import { imageBuilder } from '../../lib/sanity';
import styles from './styles.module.css';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addeventatc: any;
  }
}

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
  useEffect(() => {
    window.addeventatc.refresh();
  });

  const endDate = new Date(event.date);
  endDate.setHours(endDate.getHours() + 1);

  const calendar = {
    title: `${event.title} - FrontendCafé`,
    description: toPlainText(event.description),
    location: 'Discord',
    startTime: new Date(event.date),
    endTime: endDate,
  };

  const AddToCalendar = ({ event }) => {
    return (
      <button title="Add to Calendar" className="addeventatc button">
        Añadir a calendario
        <span className="start">
          {format(new Date(event.startTime), 'MM/dd/yyyy HH:mm')}
        </span>
        <span className="end">
          {format(new Date(event.endTime), 'MM/dd/yyyy HH:mm')}
        </span>
        <span className="timezone">America/Argentina/Buenos_Aires</span>
        <span className="title">{event.title}</span>
        <span className="description">{event.description}</span>
        <span className="location">{event.location}</span>
      </button>
    );
  };

  return (
    <div className={`pt-12 md:px-4 md:w-1/2 ${past ? 'lg:w-1/4' : 'lg:w-1/3'}`}>
      <div className="flex flex-col items-start h-full bg-gray-800 border-2 border-gray-500 rounded-md shadow-lg">
        <img
          className="w-full p-4"
          src={imageBuilder.image(event.cover.src).width(400).url()}
          alt={event.cover.alt || event.title}
          style={{ filter: past ? 'grayscale(66%)' : 'none' }}
        />
        <div
          className={`flex-grow p-4 pt-0 flex flex-col ${
            past && !event.recording ? styles['past-event-text'] : ''
          }`}
        >
          <div className="flex justify-between w-full">
            <h2 className="text-sm font-medium tracking-widest text-primary title-font">
              {event.category.name}
            </h2>
          </div>
          <h1 className="mb-3 text-xl font-medium leading-tight text-gray-200 title-font">
            {event.title}
          </h1>
          <p className="font-medium text-gray-200 break-all title-font ">
            {format(new Date(event.date), 'd  MMMM - HH:mm ', {
              locale: es,
            })}
            hrs
            <span className="inline-block text-sm font-light">
              Horario en tu ubicación actual
            </span>
          </p>
          <div className={`mb-5 text-gray-400 ${styles.description}`}>
            <BlockContent blocks={event.description} />
          </div>
          {past ? (
            event.recording && (
              <div className="mt-auto">
                <a
                  href={event.recording}
                  className="px-5 py-2 text-sm rounded text-gray-50 bg-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver grabación
                </a>
              </div>
            )
          ) : (
            <div className="mt-auto">
              <AddToCalendar event={calendar} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
