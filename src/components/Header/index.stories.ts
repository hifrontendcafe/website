import { Meta, StoryObj } from '@storybook/react';
import Header from '.';
// TODO: Requires work.
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
      asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg', _type: 'img' },
    },
    navItems: [{ link: '#', title: 'Title' }],
    preview: true,
  },
};
