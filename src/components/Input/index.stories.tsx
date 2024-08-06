import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import InputCompomponent from '.';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const meta = {
  title: 'Input',
  component: InputCompomponent,
  args: {},
} satisfies Meta<typeof InputCompomponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default text input',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = await canvas.getByRole('textbox');

    await sleep(1000);
    await userEvent.tab();
    await sleep(1000);
    await userEvent.type(element, 'FrontendCafe', { delay: 150 });
    await userEvent.tab();
  },
};

export const Input: Story = {
  args: {
    label: 'Text input',
    type: 'text',
  },
  play: Default.play,
};

export const Textarea: Story = {
  args: {
    label: 'Text area',
    type: 'textarea',
  },
  play: Default.play,
};
