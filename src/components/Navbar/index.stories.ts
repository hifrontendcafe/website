import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import Navbar from '.';
import logoImg from '../../../public/nav-logo.svg';

const args = {
  isOpen: true,
  logoImg,
  navItems: [
    { link: '#', title: 'Home' },
    { link: '#', title: 'About' },
    { link: '#', title: 'Contact' },
  ],
  toggle: () => {
    console.log('toggle');
  },
} satisfies ComponentProps<typeof Navbar>;

const meta = {
  title: 'Navbar',
  component: Navbar,
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args,
};
