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

const components: Record<string, React.FC> = {
  card: CardComponent,
  sectionHero: SectionHero,
  grid: Grid,
  textComponent: Text,
  steps: Steps,
  featureCard: FeatureCard,
  spacing: Spacing,
};

const Matcher: React.FC<Component> = ({ _type, ...props }) => {
  const Component = useMemo(() => components[_type], [_type]);

  if (!Component) return null;

  return <Component {...props} />;
};

export default Matcher;
