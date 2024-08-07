import { Meta, StoryObj } from '@storybook/react';
import SimpleModal from '.';

const args = {
  title: 'Lorem, ipsum.',
  isOpen: true,
  footer: <button className="btn btn-secondary">Action</button>,
  children: (
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla corrupti
      dolor eius, nam nisi quos, dolore aut, fugit in quidem tempore iusto!
    </p>
  ),
  close: () => {
    console.log('close');
  },
};

const meta = {
  title: 'SimpleModal',
  component: SimpleModal,
  args,
} satisfies Meta<typeof SimpleModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args,
};
