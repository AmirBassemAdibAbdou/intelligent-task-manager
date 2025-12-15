import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

class AskChatDto {
  query!: string;
}

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('ask')
  async ask(@Body() body: AskChatDto): Promise<string> {
    return this.chatService.askQuestion(body.query);
  }
}
