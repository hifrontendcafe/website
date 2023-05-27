'use client';

import { Component } from '@/lib/types';
import { useMemo } from 'react';
import {
  CardComponent,
  Grid,
  Text,
  Steps,
  FeatureCard,
  Spacing,
} from './Components';
import SectionHero from '../SectionHero';

const components: Record<string, React.FC<any>> = {
  card: CardComponent,
  sectionHero: SectionHero,
  grid: Grid,
  textComponent: Text,
  steps: Steps,
  featureCard: FeatureCard,
  spacing: Spacing,
};

const Matcher: React.FC<Component> = ({ _type, ...props }) => {
  const Component: React.FC<typeof props> = useMemo(
    () => components[_type],
    [_type],
  );

  if (!Component) return null;

  return <Component {...props} />;
};

export const PageComponents: React.FC<{ components?: Component[] }> = ({
  components,
}) => {
  return (
    <div>
      {components?.map((component) => (
        <Matcher key={component._key} {...component} />
      ))}
    </div>
  );
};

export default Matcher;
