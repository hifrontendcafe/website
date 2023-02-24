const cmykVersions = [
  { version: 'cmyk-1', name: 'CMYK 1', edition: 1 },
  { version: 'cmyk-2', name: 'CMYK 2', edition: 2 },
  { version: 'cmyk-3', name: 'CMYK 3', edition: 3 },
  { version: 'cmyk-4', name: 'CMYK 4', edition: 4 },
];

const Card = () => {
  return (
    <div className="h-[400px] flex flex-col justify-between rounded-md p-4 shadow-lg w-full bg-zinc-800 animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="h-40 w-full rounded-md bg-zinc-700 animate-pulse" />

        <div className="w-40 h-8 bg-zinc-700 rounded-md animate-pulse" />

        <div className="w-full h-16 bg-zinc-700 rounded-md animate-pulse" />
      </div>

      <div className="flex justify-between gap-6">
        <div className="rounded-md h-10 w-full bg-zinc-700 animate-pulse" />

        <div className="rounded-md h-10 w-full bg-zinc-700 animate-pulse" />
      </div>
    </div>
  );
};

export default function CMYKEditionsSkeleton() {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h3 className="font-medium subtitle">Ediciones</h3>
        <ul className="flex gap-2 w-full mt-6 mb-16 md:w-8/12">
          {cmykVersions.map((cmykVersion) => (
            <li
              key={cmykVersion.version}
              className="py-2 cursor-pointer animate-pulse text-tertiary w-1/3 flex justify-center border-b"
            >
              <div className="w-16 h-6 bg-zinc-700 rounded-md animate-pulse" />
            </li>
          ))}
        </ul>
      </div>
      <div className="relative z-10 grid max-w-4xl grid-cols-1 gap-6 p-6 mx-auto sm:px-6 lg:px-12 md:grid-cols-2 justify-items-center md:gap-10">
        <Card />

        <Card />

        <Card />

        <Card />

        <Card />

        <Card />
      </div>
    </>
  );
}
