import { Meta, StoryObj } from '@storybook/react';
import MentorCard from '.';

const meta = {
  title: 'Components/Cards/Mentor Card',
  component: MentorCard,
  args: {
    canBookAMentorship: false,
    mentor: {
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
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MentorCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
