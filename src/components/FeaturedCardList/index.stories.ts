import { Meta, StoryObj } from '@storybook/react';
import FeaturedCardList from '.';

const meta = {
  component: FeaturedCardList,
  args: {
    featuredCards: Array(3).fill({
      btnText: 'Visit page',
      color: '',
      description:
        '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      icon: '',
      link: '/',
      title: 'Lorem Ipsum',
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturedCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
