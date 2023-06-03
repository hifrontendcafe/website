import { Meta, StoryObj } from '@storybook/react';
import CMYKItemCard from '.';

const meta = {
  title: 'Components/Cards/CMYK Item Card',
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
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error vitae repellat dolores iste, maxime neque delectus, debitis ipsa omnis architecto a earum eaque, reprehenderit sequi atque eius voluptate expedita laboriosam!',
      github: '#repository',
      image: {
        src: 'https://placehold.co/400x200',
      },
      name: 'Project name',
    },
  },
};
