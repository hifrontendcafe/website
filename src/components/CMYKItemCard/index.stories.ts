import { Meta, StoryObj } from '@storybook/react';
import CMYKItemCard from '.';

const meta = {
  component: CMYKItemCard,
  args: {},
  tags: ['autodocs'],
} satisfies Meta<typeof CMYKItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    index: 0,
    project: {
      _id: '',
      cmykVersion: '0',
      color: '',
      demo: '#url',
      description: 'Project description',
      github: '#repository',
      image: {
        src: 'https://placehold.co/400x200',
      },
      name: 'Project name',
    },
  },
};
