import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import Modal from '.';

const args = {
  isOpen: true,
  title: 'This modal is not being used.',
  children: (
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla corrupti
      dolor eius, nam nisi quos, dolore aut, fugit in quidem tempore iusto!
    </p>
  ),
  close: () => {
    console.log('close');
  },
} satisfies ComponentProps<typeof Modal>;

const meta = {
  title: 'Modal',
  component: Modal,
  args,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
