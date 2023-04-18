import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { atomApiKey } from '@/atoms';
import Button from '@/components/common/Button';
import InputText from '@/components/common/InputText';
import { COLOR } from '@/constants/color';
import logo from '@/public/numble_icon.svg';

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const setKey = useSetRecoilState(atomApiKey);

  const doLogin = () => {
    if (input.length !== 32 || !input.match(/[0-9A-z]+/)) {
      setError('API 키의 형식이 유효하지 않습니다.');
      return;
    }
    setKey(input);
    router.push('/list');
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target.name === 'key') {
      setInput(target.value);
      setError('');
    }
  };

  return (
    <Container>
      <Content>
        <Image alt="service logo" src={logo} width={80} />
        <InputText
          label="API KEY"
          name="key"
          onChange={onChange}
          value={input}
          errorMessage={error}
        />
      </Content>
      <Footer>
        <Button text="Login" width="100%" padding="10px" onClick={doLogin} />
        <Button
          variant="text"
          text="KEY 발급받는 방법"
          textColor={COLOR.white}
          fontSize="0.9rem"
        />
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  max-width: 800px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 20px;
  gap: 50px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
