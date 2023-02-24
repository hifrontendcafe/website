'use client';

import Image from 'next/image';
import useSWR from 'swr';
import RichText from '../RichText';
import { getUserCountry } from '@/lib/country';
import { PortableTextReactComponents } from '@portabletext/react';
import { Card } from '../Card';

export const useFlag = () => {
  return useSWR('flag', () =>
    getUserCountry().then((country) => country.flags.svg),
  );
};

export const FlagImage = () => {
  const flag = useFlag();

  if (!flag.data) return null;

  return (
    <div className="flex items-center justify-center">
      <Image
        src={flag.data}
        className="rounded-full object-cover"
        height="15"
        width="15"
        alt="Flag"
      />
    </div>
  );
};

export const TimeText = () => {
  const flag = useFlag();

  return (
    <Card.Paragraph className="p-0 text-xs font-light text-quaternary">
      {!flag.data && 'Horario en tu ubicación actual'}
    </Card.Paragraph>
  );
};

const components: Partial<PortableTextReactComponents> = {
  block: {
    // eslint-disable-next-line react/display-name
    normal: ({ children }) => <p className="my-2 text-base">{children}</p>,
  },
};

export const RichTextBody: React.FC<{ value: any }> = ({ value }) => {
  return <RichText components={components} value={value} />;
};
