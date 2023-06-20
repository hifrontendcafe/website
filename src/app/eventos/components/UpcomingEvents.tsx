import DateAndTime from '@/components/DateAndTime';
import DateWidget from '@/components/DateWidget';
import { type DiscordEvent } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  events: DiscordEvent[];
}

function UpcomingEvents({ events }: Props) {
  const sortedEvents = events.sort(
    (eventA, eventB) =>
      new Date(eventA.scheduled_start_time).getTime() -
      new Date(eventB.scheduled_start_time).getTime(),
  );

  const nextEvent = sortedEvents[0];
  const nextEventDate = nextEvent.scheduled_start_time;

  return (
    <>
      <div className="grid items-center lg:grid-cols-2 gap-x-6 gap-y-2">
        <div className="flex items-center justify-between gap-4">
          <Image
            className="rounded"
            src={`https://cdn.discordapp.com/guild-events/${nextEvent.id}/${nextEvent.image}.png?size=512`}
            width={512}
            height={204}
            alt={nextEvent.name}
          />
          <DateWidget
            className="lg:hidden mx-auto"
            dateString={nextEventDate}
          />
        </div>

        <div className="flex flex-col gap-2">
          <DateAndTime
            className="hidden lg:block text-sm text-tertiary"
            dateString={nextEventDate}
          />
          <h3 className="truncate text-2xl font-semibold ">{nextEvent.name}</h3>
          <p className=" line-clamp-6 text-zinc-400 whitespace-pre-line">
            {nextEvent.description}
          </p>
          <Link
            className="btn btn-primary self-end"
            href="https://discord.gg/frontendcafe"
            target="_blank"
            rel="noreferrer"
          >
            Mas información
          </Link>
        </div>
      </div>

      {sortedEvents.length > 1 && (
        <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {sortedEvents.slice(1, 4).map((event) => (
            <li
              className="flex items-start gap-3 md:[&:nth-child(3)]:hidden xl:[&:nth-child(3)]:flex"
              key={event.id}
            >
              <DateWidget dateString={event.scheduled_start_time} />
              <div className="flex flex-col gap-2">
                <h3 className="truncate">{event.name}</h3>
                <p className="text-sm line-clamp-4 text-zinc-400 whitespace-pre-line">
                  {event.description}
                </p>
                <Image
                  className="rounded"
                  src={`https://cdn.discordapp.com/guild-events/${event.id}/${event.image}.png?size=512`}
                  width={512}
                  height={204}
                  alt={event.name}
                />
                <Link
                  className="btn btn-secondary self-end"
                  href="https://discord.gg/frontendcafe"
                  target="_blank"
                  rel="noreferrer"
                >
                  Mas información
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default UpcomingEvents;
