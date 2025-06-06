import { GoogleGenerativeAI } from '@google/generative-ai';

import { config } from '../../config';

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: ReturnType<GoogleGenerativeAI['getGenerativeModel']>;

  constructor() {
    this.genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async chatResponse(
    hostory: { role: string; content: string }[],
    message: string
  ): Promise<string> {
    // Map hostory to the expected format for history
    const formattedHistory = hostory.map(h => ({
      role: h.role,
      parts: [{ text: h.content }]
    }));
    const chat = this.model.startChat({
      history: formattedHistory
    });
    const result = await chat.sendMessage(message);
    return result.response.text();
  }
}

export const geminiService = new GeminiService();
