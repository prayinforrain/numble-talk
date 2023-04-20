interface Message {
  id: number;
  author: number; // 0이면 나, 1~5가 AI
  content: string;
  createdAt: number;
}

export type { Message };
