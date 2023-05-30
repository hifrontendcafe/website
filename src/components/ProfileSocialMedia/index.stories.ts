import { Meta, StoryObj } from '@storybook/react';
import ProfileSocialMedia from '.';

const meta = {
  component: ProfileSocialMedia,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileSocialMedia>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    socialMedia: {
      github: 'github',
      linkedin: 'linkedin',
      twitter: 'twitter',
      web: 'globe',
    },
  },
};
