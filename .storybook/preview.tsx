import type { Preview } from '@storybook/react';

import NumbleProvider from '../components/common/Theme';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <NumbleProvider>
        <Story />
      </NumbleProvider>
    ),
  ],
};

export default preview;
