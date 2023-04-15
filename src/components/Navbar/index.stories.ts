import { Meta, StoryObj } from '@storybook/react';
import Navbar from '.';
import logoImg from '../../../public/nav-logo.svg';

const meta = {
  component: Navbar,
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Check props
    isOpen: true,
    logoImg,
    navItems: [
      { link: '#', title: 'Home' },
      { link: '#', title: 'About' },
      { link: '#', title: 'Contact' },
    ],
  },
};
