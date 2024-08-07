import { Meta, StoryObj } from '@storybook/react';
import ProfileList from '.';

const meta = {
  title: 'ProfileList',
  component: ProfileList,
  args: {},
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isError: false,
    isLoading: false,
    profiles: Array(6).fill({
      _id: '0',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit est, similique voluptatem doloribus laudantium cumque deleniti asperiores quae tempore beatae?',
      isAvailable: false,
      location: 'Location',
      person: {
        _id: '1',
        discord: '/#',
        email: '/#',
        firstName: 'First Name',
        github: '/#',
        lastName: 'Lastname',
        linkedin: '/#',
        photo: 'https://placehold.co/400x400',
        portfolio: 'portfolio',
        twitter: '/#',
        username: 'User Name',
      },
      role: {
        _id: '0',
        name: 'Role',
      },
      seniority: {
        _id: '1',
        name: 'Senionity',
      },
      technologies: [
        {
          _id: '1',
          name: 'Frontend',
        },
        {
          _id: '1',
          name: 'UI/UX',
        },
      ],
    }),
  },
};
