import { Meta, StoryObj } from '@storybook/react';
import Header from '.';

const meta = {
  component: Header,
  args: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: {
      _type: 'image',
      asset: {
        _ref: 'image-5fb09ec79f21b59d1fa4ab5b7666405ea7958571-197x36-svg',
        _type: 'reference',
      },
    },
    navItems: [
      { link: '#', title: 'Home' },
      { link: '#', title: 'About' },
      { link: '#', title: 'Contact' },
    ],
    preview: true,
  },
};
