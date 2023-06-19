import { Card } from '../Card';
import type { Component, FeaturedCards, Step } from '@/lib/types';
import Matcher from './Matcher';
import clsx from 'clsx';
import StepsComponent from '../Steps';
import { imageBuilder } from '@/lib/sanity';
import FeaturedCard from '../FeaturedCard';

type CardComponentProps = {
  title?: string;
  headline?: string;
  paragraph?: string;
  image: string;
};

export const CardComponent: React.FC<CardComponentProps> = ({
  title,
  headline,
  paragraph,
  image,
}) => {
  return (
    <Card>
      <Card.Header>
        {image && (
          <Card.Image
            src={imageBuilder.image(image).url()}
            alt={title!}
            width={400}
            height={200}
            blurDataURL={`${imageBuilder.image(image).url()}`}
          />
        )}

        {headline && <Card.Headline>{headline}</Card.Headline>}

        {title && <Card.Title>{title}</Card.Title>}
      </Card.Header>

      <Card.Body>
        {paragraph && <Card.Paragraph>{paragraph}</Card.Paragraph>}
      </Card.Body>
    </Card>
  );
};

type GridProps = {
  columns: number;
  gap: number;
  content: Component[];
};

export const Grid: React.FC<GridProps> = ({
  columns = 1,
  content,
  gap = 0,
}) => (
  <div
    style={{ gap }}
    // style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    className={clsx('grid my-4', {
      'grid-cols-2': columns === 2,
      'grid-cols-3': columns === 3,
      'grid-cols-4': columns === 4,
      'grid-cols-5': columns === 5,
      'grid-cols-6': columns === 6,
    })}
  >
    {content.map((component) => (
      <Matcher key={component._key} {...component} />
    ))}
  </div>
);

type TextProps = {
  text: string;
  type?: 'paragraph' | 'subtitle' | 'title';
  center?: boolean;
};

export const Text: React.FC<TextProps> = ({ text, type, center }) => {
  const className = clsx('my-4', {
    ['text-tertiary lg:text-xl lg:w-2/3']: type === 'paragraph',
    ['text-center m-auto']: center,
    [type!]: type !== 'paragraph',
  });

  if (type === 'title') {
    <h1 className={className}>{text}</h1>;
  }

  if (type === 'subtitle') {
    return <h2 className={className}>{text}</h2>;
  }

  return <p className={className}>{text}</p>;
};

export const Steps: React.FC<{ steps: Step[] }> = ({ steps }) => (
  <StepsComponent steps={steps} />
);

export const FeatureCard: React.FC<FeaturedCards> = (props) => (
  <FeaturedCard {...props} />
);

export const Spacing: React.FC<{ width?: number; height: number }> = ({
  width,
  height,
}) => <div style={{ width: width ?? '100%', height }} />;
