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
      <div className="grid items-center gap-x-6 gap-y-2 lg:grid-cols-2">
        <div className="flex min-w-0 items-center justify-between gap-4">
          <Image
            className="rounded"
            src={`https://cdn.discordapp.com/guild-events/${nextEvent.id}/${nextEvent.image}.png?size=512`}
            width={512}
            height={204}
            alt={nextEvent.name}
          />
          <DateWidget
            className="mx-auto lg:hidden"
            dateString={nextEventDate}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <DateAndTime
            className="hidden text-sm text-tertiary lg:block"
            dateString={nextEventDate}
          />
          <h3 className="truncate text-2xl font-semibold ">{nextEvent.name}</h3>
          <p className=" line-clamp-6 whitespace-pre-line text-zinc-400">
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
        <ul className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {sortedEvents.slice(1, 4).map((event) => (
            <li
              className="flex min-w-0 gap-3 md:[&:nth-child(3)]:hidden xl:[&:nth-child(3)]:flex"
              key={event.id}
            >
              <DateWidget dateString={event.scheduled_start_time} />
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                <h3 className="truncate">{event.name}</h3>
                <p className="line-clamp-4 whitespace-pre-line text-sm text-zinc-400">
                  {event.description}
                </p>
                <Image
                  className="mt-auto rounded"
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
