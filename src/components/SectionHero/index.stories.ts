import { Meta, StoryObj } from '@storybook/react';
import SectionHero from '.';

const meta = {
  title: 'SectionHero',
  component: SectionHero,
  args: {},
  tags: ['autodocs'],
} satisfies Meta<typeof SectionHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Lorem ipsum',
    cta: '/#',
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit est, similique voluptatem doloribus laudantium cumque deleniti asperiores quae tempore beatae?',
  },
};
