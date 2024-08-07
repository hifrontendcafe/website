import { Meta, StoryObj } from '@storybook/react';
import DateWidget from '.';

const meta = {
  title: 'DateWidget',
  component: DateWidget,
  args: {},
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DateWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dateString: new Date(new Date().toDateString() + 3),
  },
};

export const Today: Story = {
  args: {
    dateString: new Date(),
  },
};
