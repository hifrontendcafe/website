import { Meta, StoryObj } from '@storybook/react';
import ProfileBody from '.';

const meta = {
  title: 'ProfileBody',
  component: ProfileBody,
  args: {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit est, similique voluptatem doloribus laudantium cumque deleniti asperiores quae tempore beatae?',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
