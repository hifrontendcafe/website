import { Meta, StoryObj } from '@storybook/react';
import MentorList from '.';

const meta = {
  component: MentorList,
  args: {},
  tags: ['autodocs'],
} satisfies Meta<typeof MentorList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mentors: Array(6).fill({
      twitter: '',
      description: 'Description',
      github: 'GitHub url',
      name: 'Name',
      status: 'NOT_AVAILABLE',
      web: 'Website url',
      linkedin: 'LinkedIn url',
      calendly: '',
      photo: { src: '', alt: 'Alt text' },
      topics: [
        {
          _key: '_key',
          _ref: '_ref',
        },
      ],
    }),
    topics: [
      {
        _id: 'id',
        description: 'description',
        title: 'title',
      },
    ],
  },
};
