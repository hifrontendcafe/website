import { format } from 'date-fns';
import AddToCalendar from 'react-add-to-calendar';
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
      .map((block) => {
        if (block._type !== 'block' || !block.children) {
          return '';
        }
        return block.children.map((child) => child.text).join('');
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

  return (
    <div className={`py-8 px-4 md:w-1/2 ${past ? 'lg:w-1/4' : 'lg:w-1/3'}`}>
      <div className="h-full flex items-start rounded overflow-hidden shadow-lg flex-col">
        <img
          className="w-full"
          src={imageBuilder.image(event.cover.src).width(450).url()}
          alt={event.cover.alt || event.title}
          style={{ filter: past ? 'grayscale(66%)' : 'none' }}
        />
        <div
          className={`flex-grow p-4 flex flex-col ${
            past && !event.recording ? styles['past-event-text'] : ''
          }`}
        >
          <div className="w-full flex justify-between">
            <h2 className="tracking-widest text-xs title-font font-medium text-green-500 mb-1 py-2">
              {event.category.name}
            </h2>
          </div>
          <h1 className="title-font text-xl font-medium text-gray-900 mb-3 leading-tight">
            {event.title}
          </h1>
          <p className="title-font font-light text-gray-700 mb-6">
            {format(new Date(event.date), 'MMM d - HH:mm')} ART (GMT-3)
          </p>
          <div className={`mb-5 ${styles.description}`}>
            <BlockContent blocks={event.description} />
          </div>
          <div className="mt-auto mb-2">
            {past ? (
              event.recording && (
                <a
                  href={event.recording}
                  className="bg-red-500 text-white text-sm py-2 px-5 rounded"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver grabación
                </a>
              )
            ) : (
              <AddToCalendar
                event={calendar}
                buttonLabel="Añadir a mi calendario"
                displayItemIcons={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
