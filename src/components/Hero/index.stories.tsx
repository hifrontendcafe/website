import { Meta, StoryObj } from '@storybook/react';
import HeroComponent from '.';

const meta: Meta<typeof HeroComponent> = {
  title: 'Hero',
  component: HeroComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HeroComponent>;

export const Default: Story = {
  args: {
    heroWords: ['Hero', 'Title', 'Example'],
    subtitle: 'subtitle example',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione est ducimus quos cum maxime saepe.',
    discordButtonLabel: 'Súmate a Discord',
    iniciativasButtonText: 'Do NOT click. Unless..?',
  },
};
