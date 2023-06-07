import { Topic } from '@/lib/types';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import Combobox from '.';

type TopicProp = Pick<Topic, '_id' | 'title'>;

const options: TopicProp[] = [
  {
    title: 'Frontend',
    _id: 'Frontend',
  },
  {
    title: 'Backend',
    _id: 'Backend',
  },
  {
    title: 'Mobile',
    _id: 'Mobile',
  },
  {
    title: 'Diseño UI/UX',
    _id: 'Diseño UI/UX',
  },
  {
    title: 'Ingles',
    _id: 'Ingles',
  },
];
const defaultValue: TopicProp[] = [
  {
    title: 'Frontend',
    _id: 'Frontend',
  },
  {
    title: 'Diseño UI/UX',
    _id: 'Diseño UI/UX',
  },
];
const meta = {
  args: {
    isMulti: true,
    getOptionLabel: (option) => option.title,
    getOptionValue: (option) => option._id,
    options: options,
    defaultValue: defaultValue,
  },
  component: Combobox,
} satisfies Meta<typeof Combobox<TopicProp, true>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.getByRole('combobox');
    const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

    await sleep(500);
    await userEvent.tab();
    await sleep();
    await userEvent.type(input, 'back', { delay: 150 });
    await sleep();
    await userEvent.keyboard('{enter}');
    await sleep();
    await userEvent.keyboard('[ArrowLeft][ArrowLeft]', { delay: 300 });
    await sleep(2000);
    await userEvent.keyboard(
      '{backspace}[ArrowDown][ArrowDown][ArrowDown]{enter}',
      {
        delay: 500,
      },
    );
  },
};
