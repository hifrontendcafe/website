import { format } from 'date-fns';
import BlockContent from '@sanity/block-content-to-react';
import { Event } from '../../lib/types';
import { imageBuilder } from '../../lib/sanity';
import styles from './styles.module.css';

interface EventPreviewProps {
  event: Event;
  past?: boolean;
}

const EventPreview: React.FC<EventPreviewProps> = ({ event, past = false }) => {
  const endDate = new Date(event.date);
  endDate.setHours(endDate.getHours() + 1);

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

  const calendar = {
    title: `${event.title} - FrontEndCafe`,
    description: toPlainText(event.description),
    location: 'Discord',
    startTime: new Date(event.date),
    endTime: endDate,
  };

  const AddToCalendar = ({ event }) => {
    return (
      <div title="Add to Calendar" className="addeventatc button">
        Añadir a mi calendario
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
      </div>
    );
  };

  return (
    <div
      className={`py-8 md:pb-24 px-4 md:w-1/2 ${
        past ? 'lg:w-1/4' : 'lg:w-1/3'
      }`}
    >
      <div className="flex flex-col items-start h-full  rounded shadow-lg">
        <img
          className="w-full"
          src={imageBuilder.image(event.cover.src).width(450).url()}
          alt={event.cover.alt || event.title}
          style={{ filter: past ? 'grayscale(66%)' : 'none' }}
        />
        <div
          className={`flex-grow p-4 flex flex-col bg-white ${
            past && !event.recording ? styles['past-event-text'] : ''
          }`}
        >
          <div className="flex justify-between w-full">
            <h2 className="py-2 mb-1 text-xs font-medium tracking-widest text-green-500 title-font">
              {event.category.name}
            </h2>
          </div>
          <h1 className="mb-3 text-xl font-medium leading-tight text-gray-900 title-font">
            {event.title}
          </h1>
          <p className="mb-6 font-light text-gray-700 title-font">
            {format(new Date(event.date), 'MMM d - HH:mm')} hrs (horario local)
          </p>
          <div className={`mb-5 ${styles.description}`}>
            <BlockContent blocks={event.description} />
          </div>
          <div className="mt-auto mb-2">
            {past ? (
              event.recording && (
                <a
                  href={event.recording}
                  className="px-5 py-2 text-sm text-white rounded bg-tertiary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver grabación
                </a>
              )
            ) : (
              <AddToCalendar event={calendar} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
