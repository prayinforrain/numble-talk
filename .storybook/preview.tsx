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
        <div
          style={{
            padding: '20px',
            backgroundColor: 'black',
            width: '100%',
            height: '100%',
          }}
        >
          <Story />
        </div>
      </NumbleProvider>
    ),
  ],
};

export default preview;
