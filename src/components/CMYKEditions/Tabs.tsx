'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export const cmykVersions = [
  { version: 'cmyk-1', name: 'CMYK 1', edition: 1 },
  { version: 'cmyk-2', name: 'CMYK 2', edition: 2 },
  { version: 'cmyk-3', name: 'CMYK 3', edition: 3 },
  { version: 'cmyk-4', name: 'CMYK 4', edition: 4 },
];

export const lastVersion = cmykVersions[cmykVersions.length - 1].edition;

export default function CMYKEditionsTabs() {
  const searchParams = useSearchParams();

  const currentCMYK = +searchParams.get('edition') || lastVersion;

  const tabStyle = `py-2 cursor-pointer text-tertiary w-1/3 flex justify-center border-b`;
  const tabStyleActive = `py-2 font-semibold cursor-pointer text-zinc-100 w-1/3 flex justify-center border-b-4 border-zinc-100`;

  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="font-medium subtitle">Ediciones</h3>
      <ul className="flex w-full mt-6 mb-16 md:w-8/12">
        {cmykVersions.map((cmykVersion) => (
          <li
            className={
              cmykVersion.edition === currentCMYK ? tabStyleActive : tabStyle
            }
            key={cmykVersion.version}
          >
            <Link
              replace
              shallow
              scroll={false}
              href={{
                pathname: '/cmyk',
                query: {
                  edition: cmykVersion.edition,
                },
              }}
              className="w-full h-full"
            >
              {cmykVersion.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
