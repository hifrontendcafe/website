import UpcomingEvents from '@/app/eventos/components/UpcomingEvents';
import { getAllEvents } from '@/lib/api.server';
import { getAllDiscordEvents } from '@/lib/discord';
import type { Event } from '@/lib/types';
import { isPast } from 'date-fns';
import EventPreview from '../EventPreview';

const pastEvents = (events: Event[]) =>
  events.filter((event) => isPast(new Date(event.date)));

export default async function EventList() {
  const events = await getAllEvents({
    next: { revalidate: 60 },
  });

  const upcomingEvents = await getAllDiscordEvents();

  return (
    <div id="events" className="space-y-20">
      {upcomingEvents.length > 0 && (
        <section className="space-y-10">
          <h2 className="subtitle mt-10 md:mt-20">Próximos eventos</h2>
          <UpcomingEvents events={upcomingEvents} />
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
