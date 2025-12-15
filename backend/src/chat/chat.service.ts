import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';
import axios from 'axios';

@Injectable()
export class ChatService {
  constructor(private readonly tasksService: TasksService) {}

  async askQuestion(query: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new BadRequestException('GEMINI_API_KEY is not set');
    }

    const tasks = await this.tasksService.getTasks();
    const taskSummary = tasks
      .map((t) => `- ${t.title || 'Untitled'} | status: ${t.status ?? 'unknown'} | priority: ${t.priority ?? 'unknown'}`)
      .join('\n');

    const prompt = `User query:\n${query}\n\nTasks:\n${taskSummary || 'No tasks available.'}`;

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
        {
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: {
            'x-goog-api-key': apiKey,
          },
        },
      );

      return response.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response generated.';
    } catch (err) {
      throw new InternalServerErrorException('Failed to generate response');
    }
  }
}