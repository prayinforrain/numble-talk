import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';

import { atomApiKey } from '@/atoms';
import ChatBalloon, { PendingBalloon } from '@/components/ChatBalloon';
import Button from '@/components/common/Button';
import InputText from '@/components/common/InputText';
import Header from '@/components/Header';
import { COLOR } from '@/constants/color';
import useChat from '@/hooks/useChat';
import { RoomInfo } from '@/types/roomInfo';

const Chat = () => {
  const router = useRouter();
  const { cid } = router.query;
  const API_KEY = useRecoilValue(atomApiKey);

  const [locationState, setLocationState] = useState<number>(0); // 0 시작, 1 유효, 2 오류
  const [input, setInput] = useState<string>('');

  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    id: -1,
    name: '',
    people: 0,
  });
  const { isPending, messages, setMessages, submitChat } = useChat(
    roomInfo.people,
  );
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof cid !== 'string') {
      setLocationState(2);
      return;
    }
    if (API_KEY.length !== 51) {
      router.push('/');
      return;
    }
    const localData = localStorage.getItem(`room${cid}`);
    if (!localData) {
      setLocationState(2);
      return;
    }
    const roomList = localStorage.getItem('list');
    if (!roomList) {
      setLocationState(2);
      setRoomInfo({ ...roomInfo, name: '404_NOT_FOUND' });
      return;
    }
    const room = JSON.parse(roomList).find(
      (r: RoomInfo) => r.id === parseInt(cid),
    );
    setRoomInfo(room);
    setMessages(JSON.parse(localData));
    setLocationState(1);
  }, [cid]);

  const onKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key !== 'Enter') return;
    submitChat(input);
    setInput('');
  };

  useEffect(() => {
    if (locationState !== 1 || !cid) return;
    localStorage.setItem(`room${cid}`, JSON.stringify(messages));

    if (!chatListRef.current) return;
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [messages, locationState, isPending]);

  return (
    <Container ref={chatListRef}>
      <Head>
        <title>{roomInfo?.name} - Numble Talk</title>
      </Head>
      <Header roomName={roomInfo?.name} />
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
        {isPending && <PendingBalloon />}
      </Content>
      <ButtonContainer>
        <InputText
          placeholder="입력해주세요."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={onKeydown}
          buttonRight={
            <Button
              icon={BsSend}
              variant="text"
              textColor={COLOR.primary}
              padding="0.2rem 0.2rem"
              fontSize="1.2rem"
              onClick={() => {
                submitChat(input);
                setInput('');
              }}
              disabled={locationState !== 1 && !isPending}
            />
          }
        />
      </ButtonContainer>
    </Container>
  );
};

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
  position: fixed;
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
