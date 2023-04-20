import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';

import { atomApiKey } from '@/atoms';
import ChatBalloon, { PendingBalloon } from '@/components/ChatBalloon';
import Button from '@/components/common/Button';
import InputText from '@/components/common/InputText';
import Header from '@/components/Header';
import { COLOR } from '@/constants/color';
import { Message } from '@/types/message';
import { RoomInfo } from '@/types/roomInfo';

const MAKE_HEADER = (maxNumber: number): ChatCompletionRequestMessage => {
  return {
    role: 'system',
    content: `You are chatbots in a chat room where one user and ${maxNumber} chatbots converse. Each message is in the format of number: content, where 0 represents the user's message and 1 to n represents the messages of the nth chatbot. You are responsible for assuming the role of all 1 to ${maxNumber} chatbots and participating actively in the conversation. Each chatbot can speak all at once, only a few at a time, or one chatbot can speak multiple times. Please format your response in number: content format, with each message separated by two line breaks.`,
  };
};

const Chat = () => {
  const router = useRouter();
  const { cid } = router.query;
  const API_KEY = useRecoilValue(atomApiKey);

  const [locationState, setLocationState] = useState<number>(0); // 0 시작, 1 유효, 2 오류
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(false);
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    id: -1,
    name: '',
    people: 0,
  });
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

  const getNewId = () => {
    if (!messages.length) return 1;
    return messages[messages.length - 1].id + 1;
  };

  const doChat = async (message: string) => {
    const config = new Configuration({
      apiKey: API_KEY,
    });
    delete config.baseOptions.headers['User-Agent'];
    const openai = new OpenAIApi(config);
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        MAKE_HEADER(roomInfo.people - 1),
        ...chatHistory(),
        { role: 'user', content: message },
      ],
    });

    return completion;
  };

  const chatHistory = () => {
    const COUNT = roomInfo.people * 2;
    const rawMessages = messages.slice(-COUNT);
    const msgs: ChatCompletionRequestMessage[] = rawMessages.map((m) => {
      return {
        role: m.author === 0 ? 'user' : 'assistant',
        content: `${m.author}: ${m.content}`,
      };
    });
    return msgs;
  };

  const onKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key !== 'Enter') return;
    submitChat();
  };

  const submitChat = () => {
    if (isPending || !input.length) return;
    setIsPending(true);
    const msg: Message = {
      author: 0,
      content: input,
      createdAt: Date.now(),
      id: getNewId(),
    };
    doChat(input).then((r) => {
      console.log(r.data);
      if (
        r.data.choices[0].finish_reason !== 'stop' ||
        !r.data.choices[0].message
      ) {
        const msg: Message = {
          author: 1,
          content: '오류가 발생했습니다. 다시 한 번 시도해 주세요.',
          createdAt: Date.now(),
          id: getNewId(),
        };
        setMessages((prev) => [...prev, msg]);
        setIsPending(false);
        return;
      }
      const msgs = r.data.choices[0].message.content
        .split(/\n+(?=[1-4])/)
        .map((c) => {
          const sp = c.split(': ');
          const author = parseInt(sp[0]);
          const content = sp.slice(1).join(': ');
          const msg: Message = {
            author: author,
            content: content,
            createdAt: Date.now(),
            id: getNewId() + author,
          };
          return msg;
        });
      setMessages((prev) => [...prev, ...msgs]);
      setIsPending(false);
    });
    setMessages([...messages, msg]);
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
              onClick={submitChat}
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
