export interface IChatInterface {
  id?: string,
  userId: string,
  title: string,
  message: string,
  history: IChatHistoryInterface[],
  createdAt?: Date,
  updatedAt?: Date,
}

export interface IChatHistoryInterface {
  role: 'user' | 'assistant',
  content: string,
}
