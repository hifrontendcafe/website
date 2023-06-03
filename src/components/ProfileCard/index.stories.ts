import { Meta, StoryObj } from '@storybook/react';
import ProfileCard from '.';

const meta = {
  title: 'Components/Cards/Profile Card',
  component: ProfileCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profile: {
      _id: '0',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error vitae repellat dolores iste, maxime neque delectus, debitis ipsa omnis architecto a earum eaque, reprehenderit sequi atque eius voluptate expedita laboriosam!',
      isAvailable: false,
      location: 'location',
      person: {
        _id: '1',
        discord: 'discord',
        email: 'email',
        firstName: 'firstName',
        github: 'github',
        lastName: 'lastName',
        linkedin: 'linkedin',
        photo: 'https://placehold.co/112x112',
        portfolio: 'portfolio',
        twitter: 'twitter',
        username: 'username',
      },
      role: {
        _id: '0',
        name: 'role',
      },
      seniority: {
        _id: '1',
        name: 'senionity',
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
    },
  },
};
