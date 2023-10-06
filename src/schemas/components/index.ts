// import { MdSettingsInputComponent } from 'react-icons/md';

import card from './card';
import grid from './grid';
import featureCard from './featureCard';
import sectionHero from './sectionHero';
import text from './text';
import spacing from './spacing';
import steps from './steps';

const components = [
  card,
  featureCard,
  sectionHero,
  grid,
  text,
  steps,
  spacing,
].map((component) => ({
  // icon: MdSettingsInputComponent,
  ...component,
}));

export default components;
