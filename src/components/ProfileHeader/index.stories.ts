import { Meta, StoryObj } from '@storybook/react';
import ProfileHeader from '.';

const meta = {
  title: 'ProfileHeader',
  component: ProfileHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    coverImage: 'https://placehold.co/400x400',
    name: 'Name',
    role: 'Role',
    socialMedia: {
      web: '#',
      linkedin: '#',
    },
  },
};
