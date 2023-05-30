import { imageBuilder } from '@/lib/sanity';
import { getImageDimensions } from '@sanity/asset-utils';
import clsx from 'clsx';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React from 'react';

type Props = { children?: React.ReactNode };
interface LinkProps {
  value?: { href: string };
  children?: React.ReactNode;
}

export const Heading1: React.FC<Props> = ({ children }) => (
  <h1 className="my-10 text-4xl font-bold text-left lg:text-5xl lg:text-center lg:my-24 text-primary">
    {children}
  </h1>
);

export const Heading2: React.FC<Props> = ({ children }) => (
  <h2 className="mt-10 mb-4 text-2xl font-medium text-primary">{children}</h2>
);

export const Heading3: React.FC<Props> = ({ children }) => (
  <h3 className="mt-10 mb-4 text-lg font-medium text-primary">{children}</h3>
);

export const Link: React.FC<LinkProps> = ({ value, children }) => {
  const isInternal = value?.href.startsWith('/');

  if (!isInternal) {
    return (
      <a
        className="my-0 font-medium transition duration-100 ease-in text-informational color hover:text-darkBlue hover:underline"
        href={value?.href}
        rel="noreferrer nooponer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={value?.href}
      className="my-0 font-medium transition duration-100 ease-in text-informational color hover:text-darkBlue hover:underline"
    >
      {children}
    </NextLink>
  );
};

export const UnorderedList: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ children, className }) => (
  <ul className={clsx('px-4 leading-7 list-disc text-secondary', className)}>
    {children}
  </ul>
);

export const OrderedList: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ children, className }) => (
  <ol className={clsx('px-4 leading-7 list-decimal text-secondary', className)}>
    {children}
  </ol>
);

export const ListItem: React.FC<Props> = ({ children }) => <li>{children}</li>;

export const Paragraph: React.FC<Props> = ({ children }) => (
  <p className="mx-0 my-5 text-lg leading-7 text-secondary">{children}</p>
);

export const Strong: React.FC<Props> = ({ children }) => (
  <strong className="font-semibold">{children}</strong>
);

export const Image: React.FC<{ value: any; isInline: boolean }> = ({
  value,
  isInline,
}) => {
  const { width, height } = getImageDimensions(value);

  return (
    <NextImage
      src={imageBuilder
        .image(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url()}
      width={width}
      placeholder="blur"
      className="rounded-lg"
      blurDataURL={imageBuilder.image(value).width(20).height(20).url()}
      height={height}
      alt={value.alt}
    />
  );
};
