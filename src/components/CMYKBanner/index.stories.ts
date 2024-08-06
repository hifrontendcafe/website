import { Meta, StoryObj } from '@storybook/react';
import CMYKBanner from '.';

const meta = {
  title: 'CMYKBanner',
  component: CMYKBanner,
  tags: ['autodocs'],
} satisfies Meta<typeof CMYKBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
