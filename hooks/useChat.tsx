import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { atomApiKey } from '@/atoms';
import { Message } from '@/types/message';

const MAKE_HEADER = (maxNumber: number): ChatCompletionRequestMessage => {
  return {
    role: 'system',
    content: `You are chatbots in a chat room where one user and ${maxNumber} chatbots converse. Each message is in the format of number: content, where 0 represents the user's message and 1 to n represents the messages of the nth chatbot. You are responsible for assuming the role of all 1 to ${maxNumber} chatbots and participating actively in the conversation. Each chatbot can speak all at once, only a few at a time, or one chatbot can speak multiple times. Please format your response in number: content format, with each message separated by two line breaks.`,
  };
};

const useChat = (people: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const API_KEY = useRecoilValue(atomApiKey);

  const doChat = async (message: string) => {
    const config = new Configuration({
      apiKey: API_KEY,
    });
    delete config.baseOptions.headers['User-Agent'];
    const openai = new OpenAIApi(config);
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        MAKE_HEADER(people - 1),
        ...chatHistory(),
        { role: 'user', content: message },
      ],
    });

    return completion;
  };

  const chatHistory = () => {
    const COUNT = people * 2;
    const rawMessages = messages.slice(-COUNT);
    const msgs: ChatCompletionRequestMessage[] = rawMessages.map((m) => {
      return {
        role: m.author === 0 ? 'user' : 'assistant',
        content: `${m.author}: ${m.content}`,
      };
    });
    return msgs;
  };

  const getNewId = () => {
    if (!messages.length) return 1;
    return messages[messages.length - 1].id + 1;
  };

  const submitChat = (input: string) => {
    if (isPending || !input.length) return;
    setIsPending(true);
    const msg: Message = {
      author: 0,
      content: input,
      createdAt: Date.now(),
      id: getNewId(),
    };
    doChat(input).then((r) => {
      if (
        r.status !== 200 ||
        r.data.choices[0].finish_reason !== 'stop' ||
        !r.data.choices[0].message
      ) {
        HandleError();
        return;
      }
      const msgs = r.data.choices[0].message.content
        .split(/\n+(?=[1-4])/)
        .map((c, idx) => {
          const sp = c.split(/:[ \n]/);
          const author = parseInt(sp[0]);
          const content = sp.slice(1).join(': ');
          const msg: Message = {
            author: author,
            content: content,
            createdAt: Date.now(),
            id: getNewId() + idx + 1,
          };
          return msg;
        });
      setMessages((prev) => [...prev, ...msgs]);
      setIsPending(false);
    }, HandleError);
    setMessages([...messages, msg]);
  };

  const HandleError = () => {
    const msg: Message = {
      author: 1,
      content: '오류가 발생했습니다. 다시 한 번 시도해 주세요.',
      createdAt: Date.now(),
      id: getNewId(),
    };
    setMessages((prev) => [...prev, msg]);
    setIsPending(false);
  };

  return { messages, setMessages, submitChat, isPending };
};

export default useChat;
