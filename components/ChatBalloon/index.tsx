import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';
import { Message } from '@/types/message';

const ChatBalloon = ({ author, content }: Message) => {
  return (
    <MessageContainer>
      <MessageBalloon author={author}>{content}</MessageBalloon>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  width: 100%;
`;

interface BalloonProps {
  author: number;
}
const MessageBalloon = styled.div<BalloonProps>`
  width: fit-content;
  float: ${({ author }) => (author === 0 ? 'right' : 'left')};
  padding: 1rem;
  border-radius: ${({ author }) =>
    author === 0 ? '5px 0 5px 5px' : '0 5px 5px 5px'};
  background-color: ${({ author }) =>
    author === 0 ? COLOR.primary : COLOR.gray3};
  color: ${({ author }) => (author === 0 ? COLOR.black : COLOR.white)};
`;

export default ChatBalloon;
