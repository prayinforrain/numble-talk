# Numble Talk

<img src='https://user-images.githubusercontent.com/46566891/233397690-8f2a76c3-900d-4da8-9176-3559ca31a5dd.png' width=300>

[Numble - Next.JS로 카톡 AI 단톡방 만들기(with ChatGPT)](https://www.numble.it/deepdive/29) 프로젝트의 결과물입니다.

## 실행 방법

[Vercel 배포 서버](https://numble-talk.vercel.app/)에 접속하거나, 아래와 같은 과정으로 로컬에서 실행할 수 있습니다.  
[Chromatic으로 배포된 Storybook](https://64414e0a4088dad290f9bb22-qdsomxaktj.chromatic.com/)도 확인할 수 있습니다.

레포지토리를 Clone한 후 터미널에서 아래 명령어를 실행합니다.

```zsh
yarn # Install dependencies
yarn dev # Run dev server
```

기본 주소는 `localhost:3000` 입니다.

## 실행 화면

| 타이틀                                                                                                              | 채팅 목록                                                                                                                | 채팅 화면                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| ![main page](https://user-images.githubusercontent.com/46566891/233397690-8f2a76c3-900d-4da8-9176-3559ca31a5dd.png) | ![chat list page](https://user-images.githubusercontent.com/46566891/233399563-bb960a5d-d5da-449b-a6ed-0ba7179db298.png) | ![chat page](https://user-images.githubusercontent.com/46566891/233397617-60dd5ee5-d8d2-4100-9f7c-62a5dd4fe7e1.png) |

## 고민한 부분

- Client-side에서 openAI API를 직접 호출하면 요청이 거절됨

  - 민감한 정보(API Key)를 포함해야 하는 요청이기 때문에 존재하는 보안 장치로 생각됨
  - 이 프로젝트에서는 사용자가 직접 자기 API Key를 넣도록 되어 있어 특수한 경우로 보고 이를 판단하는 헤더를 수동으로 제거함

- 여러 명의 ai화 대화하는 경우 어떻게 구현해야 하는지?
  - 사용자의 메시지에 모두가 번갈아가며 대답하는 것이 _대화_ 라고 부르기에는 애매하다 생각
  - 또한 이런 경우 페이지를 열어 두는 것만으로도 지속적으로 요청이 발생해서 비효율적이라고 생각하였음
  - 따라서 모든 요청에서 시스템 메시지로 N명의 챗봇이 유저와 1:N으로 대화하는 상황임을 알려주고 대답을 생성하도록 요구하여 구현
  - 계속해서 시스템 메시지를 변경해가며 튜닝을 시도하였으나 시기에 따라, 유저 메시지에 따라 결과가 조금씩 달랐음
