import clsx from 'clsx';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { getImageDimensions } from '@sanity/asset-utils';
import { imageBuilder } from '@/lib/sanity';

interface LinkProps {
  value?: { href: string };
}

export const Heading1: React.FC = ({ children }) => (
  <h1 className="my-10 text-4xl font-bold text-left lg:text-5xl lg:text-center lg:my-24 text-primary">
    {children}
  </h1>
);

export const Heading2: React.FC = ({ children }) => (
  <h2 className="mt-10 mb-4 text-2xl font-medium text-primary">{children}</h2>
);

export const Heading3: React.FC = ({ children }) => (
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
    <NextLink href={value?.href}>
      <a
        className="my-0 font-medium transition duration-100 ease-in text-informational color hover:text-darkBlue hover:underline"
        href={value?.href}
      >
        {children}
      </a>
    </NextLink>
  );
};

export const UnorderedList: React.FC<{ className?: string }> = ({
  children,
  className,
}) => (
  <ul className={clsx('px-4 leading-7 list-disc text-secondary', className)}>
    {children}
  </ul>
);

export const OrderedList: React.FC<{ className?: string }> = ({
  children,
  className,
}) => (
  <ol className={clsx('px-4 leading-7 list-decimal text-secondary', className)}>
    {children}
  </ol>
);

export const ListItem: React.FC = ({ children }) => <li>{children}</li>;

export const Paragraph: React.FC = ({ children }) => (
  <p className="mx-0 my-5 text-lg leading-7 text-secondary">{children}</p>
);

export const Strong: React.FC = ({ children }) => (
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
