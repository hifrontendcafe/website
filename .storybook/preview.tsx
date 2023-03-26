import type { Preview } from '@storybook/react';
import React from 'react';
import fontVariables from '../src/lib/font-variables';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#18181b' /*  bg-zinc-900 */ },
        { name: 'light', value: '#F8F8F8' },
      ],
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className={fontVariables}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
