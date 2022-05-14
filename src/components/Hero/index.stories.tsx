import type { Story } from '@ladle/react';
import HeroComponent from './index';

interface StoryProps {
  title: string;
}

export const Hero: Story<StoryProps> = ({ title }) => (
  <>
    <HeroComponent title={title} />
  </>
);

Hero.args = {
  title: 'Hello world',
};

Hero.argTypes = {};
