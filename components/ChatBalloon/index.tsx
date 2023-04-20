import styled from '@emotion/styled';
import Image from 'next/image';

import { COLOR } from '@/constants/color';
import getProfile from '@/constants/profile';
import { Message } from '@/types/message';

const ChatBalloon = ({ author, content, createdAt }: Message) => {
  return (
    <MessageContainer author={author}>
      {author !== 0 && (
        <ProfileImageContainer>
          <Image
            src={getProfile(author)}
            alt="ai profile image"
            fill
            style={{ borderRadius: 'inherit' }}
          />
        </ProfileImageContainer>
      )}
      <MessageBalloon author={author} createdAt={createdAt}>
        {content}
      </MessageBalloon>
    </MessageContainer>
  );
};

const PendingBalloon = () => {
  return (
    <MessageContainer author={1}>
      <ProfileImageContainer></ProfileImageContainer>

      <MessageBalloon author={1}>
        <Loading>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Loading>
      </MessageBalloon>
    </MessageContainer>
  );
};

interface AuthorProps {
  author: number;
}

interface CreatedAtProps {
  createdAt?: number;
}

const MessageContainer = styled.div<AuthorProps>`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: ${({ author }) =>
    author === 0 ? 'flex-end' : 'flex-start'};
  gap: 10px;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  height: 3rem;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  border-radius: 100%;
  background-color: ${COLOR.white};
`;

const MessageBalloon = styled.div<AuthorProps & CreatedAtProps>`
  width: fit-content;
  float: ${({ author }) => (author === 0 ? 'right' : 'left')};
  padding: 1rem;
  border-radius: ${({ author }) =>
    author === 0 ? '5px 0 5px 5px' : '0 5px 5px 5px'};
  background-color: ${({ author }) =>
    author === 0 ? COLOR.primary : COLOR.gray3};
  color: ${({ author }) => (author === 0 ? COLOR.black : COLOR.white)};

  &::after {
    position: absolute;
    bottom: 2px;
    right: 5px;
    font-size: 0.6em;
    opacity: 0.6;
    content: '${({ createdAt }) =>
      createdAt && new Date(createdAt).toLocaleString('ko-kr')}';
  }
`;

const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 38px;
  height: 16px;
  & div {
    position: absolute;
    top: 6px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  & div:nth-of-type(1) {
    left: 4px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  & div:nth-of-type(2) {
    left: 4px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & div:nth-of-type(3) {
    left: 16px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & div:nth-of-type(4) {
    left: 28px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(12px, 0);
    }
  }
`;

export default ChatBalloon;
export { PendingBalloon };
