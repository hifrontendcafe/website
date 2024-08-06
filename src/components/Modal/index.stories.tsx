import { Meta, StoryObj } from '@storybook/react';
import Modal from '.';

const meta = {
  title: 'Modal',
  component: Modal,
  args: {
    isOpen: true,
    title: 'This modal is not being used.',
    children: (
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla corrupti
        dolor eius, nam nisi quos, dolore aut, fugit in quidem tempore iusto!
      </p>
    ),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
