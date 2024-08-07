import { Meta, StoryObj } from '@storybook/react';
import Analytics from '.';

const meta = {
  title: 'Analytics',
  component: Analytics,
  tags: ['autodocs'],
} satisfies Meta<typeof Analytics>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
