import { Meta } from '@storybook/react';
import MentorCard from '.';

const meta = {
  title: 'Components/Cards/Mentor Card',
  component: MentorCard,
  args: {
    mentor: {
      _id: '123',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error vitae repellat dolores iste, maxime neque delectus, debitis ipsa omnis architecto a earum eaque, reprehenderit sequi atque eius voluptate expedita laboriosam!',
      github: '/#',
      name: 'Name',
      status: 'NOT_AVAILABLE',
      topics: [{ _key: 'topic key', _ref: 'topic ref' }],
      web: '/#',
      linkedin: '/#',
      calendly: '',
      photo: {
        src: 'https://placehold.co/200x200',
        alt: 'Placeholder image',
      },
    },
    topics: [
      {
        _id: 'topic id',
        description: 'topic description',
        title: 'topic title',
      },
    ],
    event: undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MentorCard>;

export default meta;
