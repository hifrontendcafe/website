import { Meta, StoryObj } from '@storybook/react';
import FeaturedCard from '.';

const meta = {
  component: FeaturedCard,
  args: {
    btnText: 'Visit page',
    color: '',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    icon: '',
    link: '/',
    title: 'Lorem Ipsum',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
