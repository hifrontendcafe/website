import { Meta, StoryObj } from '@storybook/react';
import Profiles from '.';

const meta = {
  component: Profiles,
  args: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Profiles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    technologies: [
      { _id: '0', name: 'Technology' },
      { _id: '1', name: 'Technology' },
    ],
    roles: [
      { _id: '0', name: 'Role' },
      { _id: '1', name: 'Role' },
    ],
    seniorities: [
      { _id: '0', name: 'Seniority' },
      { _id: '1', name: 'Seniority' },
    ],
    profiles: Array(30).fill({
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
