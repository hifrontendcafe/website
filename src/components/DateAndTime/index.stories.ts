import type { Meta, StoryObj } from '@storybook/react';
import DateAndTime from '.';

const meta = {
  component: DateAndTime,
  args: {},
} satisfies Meta<typeof DateAndTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dateString: new Date().toString(),
  },
};
