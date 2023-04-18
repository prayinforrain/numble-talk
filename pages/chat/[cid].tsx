import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { BsSend } from 'react-icons/bs';

import ChatBalloon from '@/components/ChatBalloon';
import Button from '@/components/common/Button';
import InputText from '@/components/common/InputText';
import Header from '@/components/Header';
import { COLOR } from '@/constants/color';
import { Message } from '@/types/message';

const Chat = () => {
  const router = useRouter();
  const { cid } = router.query;

  const [locationState, setLocationState] = useState<number>(0); // 0 시작, 1 유효, 2 오류
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cid) {
      setLocationState(2);
      return;
    }
    const localData = localStorage.getItem(`room${cid}`);
    if (!localData) {
      setLocationState(2);
      return;
    }
    setMessages(JSON.parse(localData));
    setLocationState(1);
  }, [cid]);

  const getNewId = () => {
    if (!messages.length) return 1;
    return messages[messages.length - 1].id + 1;
  };

  const submitChat = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key !== 'Enter') return;
    const msg: Message = {
      author: 0,
      content: input,
      createdAt: Date.now(),
      id: getNewId(),
    };
    setMessages([...messages, msg]);
    setInput('');
  };

  useEffect(() => {
    if (locationState !== 1 || !cid) return;
    localStorage.setItem(`room${cid}`, JSON.stringify(messages));

    if (!chatListRef.current) return;
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [messages, locationState]);

  return (
    <Container ref={chatListRef}>
      <Header />
      <HeaderPadding />
      <Content>
        {locationState === 0 && <Error>loading..</Error>}
        {locationState === 1 &&
          messages.map((m) => (
            <ChatBalloon
              key={m.id}
              id={m.id}
              author={m.author}
              content={m.content}
              createdAt={m.createdAt}
            />
          ))}
        {locationState === 2 && (
          <Error>
            오류가 발생했습니다.
            <br />
            주소를 다시 확인해 주세요.
          </Error>
        )}
      </Content>
      <ButtonContainer>
        <InputText
          placeholder="입력해주세요."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          disabled={locationState !== 1}
          onKeyDown={submitChat}
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
  padding: 90px 20px;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${COLOR.black};
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const Error = styled.div`
  flex: 1;
  color: ${COLOR.white};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.5rem;
`;

export default Chat;
