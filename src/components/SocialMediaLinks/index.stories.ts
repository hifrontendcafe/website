import { Meta, StoryObj } from '@storybook/react';
import SocialMediaLinks from '.';

const meta = {
  title: 'SocialMediaLinks',
  component: SocialMediaLinks,
  args: {
    background: 'solid',
    socialMedia: {
      github: 'https://github.com/frontendcafe',
      linkedin: 'https://www.linkedin.com/company/frontendcafe/',
      twitter: 'https://twitter.com/FrontEndCafe',
      web: 'https://frontend.cafe/',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SocialMediaLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Transparent: Story = {
  args: {
    background: 'solid',
  },
};
