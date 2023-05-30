import { Meta, StoryObj } from '@storybook/react';
import Steps from '.';

const meta = {
  component: Steps,
  tags: ['autodocs'],
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: [...Array(3)].map((_, i) => ({
      _key: '_key',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit est, similique voluptatem doloribus laudantium cumque deleniti asperiores quae tempore beatae?',
      step: i + 1,
      title: 'Step',
    })),
  },
};
