import { cmykVersions } from './cmykVersions';

const Card = () => {
  return (
    <div className="flex h-[400px] w-full animate-pulse flex-col justify-between rounded-md bg-zinc-800 p-4 shadow-lg">
      <div className="flex flex-col gap-3">
        <div className="h-40 w-full animate-pulse rounded-md bg-zinc-700" />

        <div className="h-8 w-40 animate-pulse rounded-md bg-zinc-700" />

        <div className="h-16 w-full animate-pulse rounded-md bg-zinc-700" />
      </div>

      <div className="flex justify-between gap-6">
        <div className="h-10 w-full animate-pulse rounded-md bg-zinc-700" />

        <div className="h-10 w-full animate-pulse rounded-md bg-zinc-700" />
      </div>
    </div>
  );
};

export default function CMYKEditionsSkeleton() {
  return (
    <section className="md:mt-10">
      <div className="flex flex-col items-center text-center">
        <h3 className="subtitle font-medium">Ediciones</h3>
        <ul className="mt-6 mb-10 flex w-full gap-2 md:w-8/12">
          {cmykVersions.map((cmykVersion) => (
            <li
              key={cmykVersion.version}
              className="flex flex-1 animate-pulse justify-center border-b py-2 text-tertiary"
            >
              <div className="h-7 w-16 animate-pulse rounded-md bg-zinc-700" />
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 justify-items-center gap-6 p-6 sm:px-6 md:grid-cols-2 md:gap-10 lg:px-12">
        <Card />

        <Card />

        <Card />

        <Card />

        <Card />

        <Card />
      </div>
    </section>
  );
}
