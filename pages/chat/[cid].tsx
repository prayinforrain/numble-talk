import styled from '@emotion/styled';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsSend } from 'react-icons/bs';

import ChatBalloon from '@/components/ChatBalloon';
import Button from '@/components/common/Button';
import InputText from '@/components/common/InputText';
import Header from '@/components/Header';
import { COLOR } from '@/constants/color';
import { Message } from '@/types/message';

const TEST_MESSAGES: Message[] = [
  {
    id: 1,
    author: 0,
    content: 'ㅎㅇㅎㅇ',
    createdAt: '2',
  },
  {
    id: 2,
    author: 2,
    content: 'ㅎㅇㅎㅇ',
    createdAt: '2',
  },
  {
    id: 3,
    author: 1,
    content: '방가뿡가워용',
    createdAt: '2',
  },
];

const Chat = () => {
  //   const router = useRouter();
  //   const { cid } = router.query;

  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    setMessages(TEST_MESSAGES);
  }, []);

  return (
    <Container>
      <Header />
      <HeaderPadding />
      <Content>
        {messages.length &&
          messages.map((m) => (
            <ChatBalloon
              key={m.id}
              id={m.id}
              author={m.author}
              content={m.content}
              createdAt={m.createdAt}
            />
          ))}
      </Content>
      <ButtonContainer>
        <InputText
          placeholder="입력해주세요."
          buttonRight={
            <Button
              icon={BsSend}
              variant="text"
              textColor={COLOR.primary}
              padding="0.2rem 0.2rem"
              fontSize="1.2rem"
            />
          }
        />
      </ButtonContainer>
    </Container>
  );
};

const HeaderPadding = styled.div`
  width: 100%;
  height: 70px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  max-width: 800px;
  overflow-y: scroll;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 20px;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${COLOR.black};
`;

export default Chat;
