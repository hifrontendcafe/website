import { isPast } from 'date-fns';
import { Event } from '../../lib/types';
import EventPreview from '../EventPreview';

interface EventListProps {
  events: Event[];
}

const futureEvents = (events: Event[]) =>
  events
    .filter((event) => !isPast(new Date(event.date)))
    .sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());

const pastEvents = (events: Event[]) =>
  events.filter((event) => isPast(new Date(event.date)));

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <section id="events" className="text-gray-700 body-font relative pb-64">
      <div className="container px-5 py-16 mx-auto">
        <h1 className="text-3xl pb-12 text-green-500">Próximos Eventos</h1>
        <div className="flex flex-wrap -mx-4 -my-8">
          {futureEvents(events).map((event) => (
            <EventPreview key={event.slug} event={event} />
          ))}
        </div>
        <h1 className="text-3xl pb-12 text-green-600 mt-24">
          Eventos Anteriores
        </h1>
        <div className="flex flex-wrap -mx-4 -my-8">
          {pastEvents(events).map((event) => (
            <EventPreview key={event.slug} event={event} past={true} />
          ))}
        </div>
      </div>
      <Divider />
    </section>
  );
};

const Divider: React.FC = () => {
  return (
    <svg
      className="divider"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-300 0 950 270"
    >
      <path
        d="M-314,267 C105,364 400,100 812,279"
        stroke="#38b2ac"
        strokeWidth="120"
        strokeLinecap="round"
      />
    </svg>
  );
};
export default EventList;
