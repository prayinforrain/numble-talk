import type { Meta, StoryObj } from '@storybook/react';
import { BsSend } from 'react-icons/bs';

import Button from '@/components/common/Button';
import { COLOR } from '@/constants/color';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    variant: 'filled',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: 'Login',
  },
  render: (args) => <Button {...args} />,
};

export const Outline: Story = {
  args: {
    text: 'Login',
    variant: 'outline',
  },
  render: (args) => <Button {...args} />,
};

export const Text: Story = {
  args: {
    text: 'Login',
    variant: 'text',
  },
  render: (args) => <Button {...args} />,
};

export const WithIcon: Story = {
  args: {
    icon: BsSend,
    variant: 'text',
    textColor: COLOR.primary,
  },
  render: (args) => <Button {...args} />,
};
