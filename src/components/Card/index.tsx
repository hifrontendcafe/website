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
  <div className="flex flex-col justify-between h-full p-4 bg-zinc-800 rounded-md shadow-lg">
    {children}
  </div>
);

const CardHeader: React.FC<Props> = ({ children }) => (
  <div className="flex flex-col w-full mb-1">{children}</div>
);

const CardImage: React.FC<ImageProps> = ({ className, src, ...props }) => (
  <div className="mb-2 relative h-40 w-full">
    <Image
      className={`object-cover w-full h-40 rounded-sm ${className}`}
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
  <p className="text-sm font-medium tracking-widest text-primary title-font">
    {children}
  </p>
);

const CardTitle: React.FC<Props> = ({ children }) => (
  <h2 className="cards-title">{children}</h2>
);

const CardBody: React.FC<Props> = ({ children }) => <div>{children}</div>;

const CardParagraph: React.FC<Props & ParagraphProps> = ({
  children,
  className = '',
}) => <p className={`cards-paragraph ${className}`}>{children}</p>;

const CardActions: React.FC<Props> = ({ children }) => (
  <div className="flex items-end flex-grow w-full mt-5">
    <div className="flex justify-between w-full gap-4">{children}</div>
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
    className={`text-center btn w-full ${className}`}
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
