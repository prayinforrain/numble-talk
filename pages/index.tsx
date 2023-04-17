import Header from '@/components/Header';
import Button from '@/components/common/Button';
import InputText from '@/components/common/InputText';
import { COLOR } from '@/constants/color';
import styled from '@emotion/styled';
import logo from '@/public/numble_icon.svg';
import Image from 'next/image';

export default function Home() {
  return (
    <Container>
      <Header />
      <Content>
        <Image alt="service logo" src={logo} width={80} />
        <InputText label="API KEY" />
      </Content>
      <Footer>
        <Button text="Login" width="100%" padding="10px" />
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
