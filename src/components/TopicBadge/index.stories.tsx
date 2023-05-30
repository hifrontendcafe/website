import { Meta, StoryObj } from '@storybook/react';
import TopicBadge from '.';

const meta = {
  component: TopicBadge,
  args: {
    topic: 'Frontend',
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TopicBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single badge. */
export const Default: Story = {};

/** Multiples badges in line. */
export const MultipleBadge: Story = {
  decorators: [
    (Story) => {
      return (
        <ul>
          {['Frontend', 'UI/UX', 'Storybook', 'Sanity'].map((tag) => (
            <Story key={tag} args={{ topic: tag }} />
          ))}
        </ul>
      );
    },
  ],
};
