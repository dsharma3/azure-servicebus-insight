import { Controller, HttpCode, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post('')
  @HttpCode(201)
  async createMessages() {
    await this.messageService.createMessages();
  }
}
