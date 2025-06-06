import { BadRequestError, NotFoundError } from '../../errors/error-handlers';
import { IChatInterface } from '../../interfaces/chat.interface';
import { ChatModel } from '../../models/ChatModel';
import { geminiService } from '../gemini/gemini';

export const createChat = async (data: IChatInterface) => {
  try {
    const response = await geminiService.chatResponse(data.history, data.message);

    data.history.push(
      {
      role: 'user',
      content: data.message,
      },
      {
        role: 'assistant',
        content: response,
      });

    const chat = await ChatModel.create(data);

    return chat;
  } catch (error: unknown) {
    throw new BadRequestError(`Error: ${error}`, 'createChat() method');
  }
};

export const getChat = async (id: string) => {
  try {
    const chat = await ChatModel.findOne({ where: { id }});

    if (!chat) {
        throw new NotFoundError('Chat not found', 'getChat() method error');
      }
    return chat;
  } catch (error: unknown) {
    throw new BadRequestError(`Error: ${error}`, 'getChat() method');
  }
};

export const getChatsByTitle = async (title: string, userId: string) => {
  try {
    const chats = await ChatModel.findAll({ where: { title, userId }});

    if (!chats || chats.length === 0) {
        throw new NotFoundError('Chat not found', 'getChatsByTitle() method error');
      }
    return chats;
  } catch (error: unknown) {
    throw new BadRequestError(`Error: ${error}`, 'getChatsByTitle() method');
  }
};

export const getAllChats = async (userId: string) => {
  try {
    const chats = await ChatModel.findAll({ where: { userId }});

    if (!chats || chats.length === 0) {
        throw new NotFoundError('Chat not found', 'getAllChats() method error');
      }
    return chats;
  } catch (error: unknown) {
    throw new BadRequestError(`Error: ${error}`, 'getALlChats() method');
  }
};
