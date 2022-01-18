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
    <section id="events" className="relative body-font">
      {futureEvents(events).length > 0 && (
        <>
          <h1 className="mb-10 subtitle">Próximos eventos</h1>
          <div className="grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3">
            {futureEvents(events)?.map((event) => (
              <EventPreview key={event.slug} event={event} />
            ))}
          </div>
        </>
      )}
      <h1 className="mb-10 subtitle">Revive nuestros eventos</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pastEvents(events)?.map(
          (event) =>
            event.recording && (
              <EventPreview key={event.slug} event={event} past={true} />
            ),
        )}
      </div>
    </section>
  );
};

export default EventList;
