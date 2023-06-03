import { getAllEvents } from '@/lib/api.server';
import type { Event } from '@/lib/types';
import { isPast } from 'date-fns';
import EventPreview from '../EventPreview';

const futureEvents = (events: Event[]) =>
  events
    .filter((event) => !isPast(new Date(event.date)))
    .sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());

const pastEvents = (events: Event[]) =>
  events.filter((event) => isPast(new Date(event.date)));

export default async function EventList() {
  const events = await getAllEvents({
    next: { revalidate: 60 },
  });

  return (
    <div id="events" className="space-y-20">
      {futureEvents(events).length > 0 && (
        <section className="space-y-10">
          <h2 className="subtitle">Próximos eventos</h2>
          <ul className="mb-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {futureEvents(events)?.map((event) => (
              <EventPreview key={event.slug} event={event} />
            ))}
          </ul>
        </section>
      )}
      <section className="space-y-10">
        <h2 className="subtitle">Revive nuestros eventos</h2>
        <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {pastEvents(events)?.map(
            (event) =>
              event.recording && (
                <EventPreview key={event.slug} event={event} past={true} />
              ),
          )}
        </ul>
      </section>
    </div>
  );
}
