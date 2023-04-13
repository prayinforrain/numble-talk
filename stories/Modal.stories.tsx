import type { Meta, StoryObj } from '@storybook/react';
import Modal from '@/components/common/Modal';
import { COLOR } from '@/constants/color';
import { useState } from 'react';
import Button from '@/components/common/Button';
import styled from '@emotion/styled';

const meta: Meta<typeof Modal> = {
  title: 'Example/Modal',
  component: Modal,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  //   tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [s, setS] = useState(false);

    return (
      <>
        <Button text="Show Modal" onClick={() => setS((prev) => !prev)} />
        <Modal
          {...args}
          isShown={s}
          onDimmedClick={() => {
            setS(false);
          }}
        >
          <Wrapper>
            <div>안녕하세용~!</div>
            <ButtonContainer>
              <Button
                text="??;"
                color={COLOR.error}
                width="100%"
                onClick={() => setS(false)}
              />
              <Button text="그래" width="100%" onClick={() => setS(false)} />
            </ButtonContainer>
          </Wrapper>
        </Modal>
      </>
    );
  },
};

const Wrapper = styled.div`
  margin: 1rem;
  width: 80vw;
  max-width: 500px;
  color: ${COLOR.white};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;
