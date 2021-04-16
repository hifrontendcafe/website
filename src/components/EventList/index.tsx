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
    <section
      id="events"
      className="relative body-font bg-indigo-50"
      <div className="container px-5 py-12 mx-auto">
        {futureEvents(events).length > 0 && (
          <>
            <h1 className="pt-10 pb-6 mx-4 md:pt-0 subtitle">Próximos eventos 📅</h1>
            <div className="flex flex-wrap px-4 -mx-4 -my-8">
              {futureEvents(events)?.map((event) => (
                <EventPreview key={event.slug} event={event} />
              ))}
            </div>
          </>
        )}
        <h1 className="pt-12 pb-4 mx-4 md:pt-0 subtitle">Eventos anteriores ⏯️</h1>
        <div className="flex flex-wrap px-4 -mx-4 -my-8">
          {pastEvents(events)?.map(
            (event) =>
              event.recording && (
                <EventPreview key={event.slug} event={event} past={true} />
              ),
          )}
        </div>
      </div>
    </section>
  );
};

export default EventList;
