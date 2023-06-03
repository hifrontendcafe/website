import type { ImageProps } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type CardActionProps = { href: string; className?: string };
type ParagraphProps = { className?: string };
type Props = { children?: React.ReactNode };
type CardSubcomponents = {
  Header: React.FC<Props>;
  Image: React.FC<ImageProps>;
  Headline: React.FC<Props>;
  Title: React.FC<Props>;
  Paragraph: React.FC<Props & ParagraphProps>;
  Body: React.FC<Props>;
  Actions: React.FC<Props>;
  PrimaryAction: React.FC<Props & CardActionProps>;
  SecondaryAction: React.FC<Props & CardActionProps>;
};

const Card: React.FC<Props> & CardSubcomponents = ({ children }) => (
  <div className="flex h-full max-w-3xl flex-col justify-between rounded-md bg-zinc-800 p-4 shadow-lg">
    {children}
  </div>
);

const CardHeader: React.FC<Props> = ({ children }) => (
  <div className="mb-1 flex w-full flex-col">{children}</div>
);

const CardImage: React.FC<ImageProps> = ({ className, src, ...props }) => (
  <div className="relative mb-2 h-40 w-full">
    <Image
      className={`h-40 w-full rounded-sm object-cover ${className}`}
      placeholder="blur"
      blurDataURL={
        /* Would rather use FEC's logo form Sanity */ '/logotype-fec.svg'
      }
      src={src}
      width={!props.fill ? 340 : undefined}
      height={!props.fill ? 160 : undefined}
      {...props}
    />
  </div>
);

const CardHeadline: React.FC<Props> = ({ children }) => (
  <p className="tracking-widest title-font text-sm font-medium">{children}</p>
);

const CardTitle: React.FC<Props> = ({ children }) => (
  <h2 className="cards-title">{children}</h2>
);

const CardBody: React.FC<Props> = ({ children }) => <div>{children}</div>;

const CardParagraph: React.FC<Props & ParagraphProps> = ({
  children,
  className = '',
}) => (
  <p
    className={`text-sm font-light text-secondary md:text-base lg:text-lg ${className}`}
  >
    {children}
  </p>
);

const CardActions: React.FC<Props> = ({ children }) => (
  <div className="mt-5 flex w-full flex-grow items-end">
    <div className="flex w-full justify-between gap-4">{children}</div>
  </div>
);

const CardAction: React.FC<Props & CardActionProps> = ({
  children,
  href,
  className,
  ...props
}) => (
  <Link
    href={href}
    className={`btn w-full text-center ${className}`}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </Link>
);

const CardPrimaryAction: React.FC<Props & CardActionProps> = ({
  children,
  ...props
}) => (
  <CardAction className="btn-primary" {...props}>
    {children}
  </CardAction>
);

const CardSecondaryAction: React.FC<Props & CardActionProps> = ({
  children,
  ...props
}) => (
  <CardAction className="btn-secondary" {...props}>
    {children}
  </CardAction>
);

Card.Header = CardHeader;
Card.Image = CardImage;
Card.Headline = CardHeadline;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Paragraph = CardParagraph;
Card.Actions = CardActions;
Card.PrimaryAction = CardPrimaryAction;
Card.SecondaryAction = CardSecondaryAction;

export { Card };
