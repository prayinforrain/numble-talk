import type { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { BsSend } from 'react-icons/bs';

import Button from '@/components/common/Button';
import InputText from '@/components/common/InputText';
import { COLOR } from '@/constants/color';

const meta: Meta<typeof InputText> = {
  title: 'Example/InputText',
  component: InputText,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    placeholder: '입력해주세요.',
    width: '250px',
  },
  render: (args) => <InputText {...args} />,
};

export const WithLabel: Story = {
  args: {
    placeholder: '입력해주세요.',
    width: '250px',
    label: '라벨입니다',
  },
  render: (args) => <InputText {...args} />,
};

export const AlignRight: Story = {
  args: {
    placeholder: '입력해주세요.',
    textAlign: 'right',
  },
  render: (args) => <InputText {...args} />,
};

export const Controlled: Story = {
  args: {
    placeholder: '콘솔 창을 확인하세요.',
  },
  render: (args) => {
    const [v, setV] = useState<string>('');
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setV(e.target.value);
    };

    useEffect(() => {
      console.log(v);
    }, [v]);

    return <InputText {...args} onChange={onChange} value={v} />;
  },
};

export const WithButton: Story = {
  args: {
    placeholder: '입력해주세요.',
    width: '250px',
  },
  render: (args) => {
    const [v, setV] = useState<string>('');
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setV(e.target.value);
    };

    const onClick = () => {
      alert(v);
    };

    return (
      <InputText
        {...args}
        onChange={onChange}
        buttonRight={
          <Button
            icon={BsSend}
            variant="text"
            textColor={COLOR.primary}
            onClick={onClick}
            padding="0 0.5rem"
          />
        }
      />
    );
  },
};
