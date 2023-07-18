import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

import { ConnectionDto } from './dto/connection.dto';
import { ReceiveMessagesDto } from './dto/receivemessages.connection.dto';
@Controller('')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post('')
  @HttpCode(201)
  async createMessages() {
    await this.messageService.createMessages();
  }

  @Post('queues')
  @HttpCode(200)
  @HttpCode(400)
  @HttpCode(401)
  async getQueues(@Body() connectionDto: ConnectionDto) {
    if (connectionDto == null || connectionDto == undefined)
      return new BadRequestException();
    return await this.messageService.getMessagesWithRuntimeProperties(
      connectionDto.connectionSecret,
    );
  }

  @Post('queues/:id/peek')
  @HttpCode(200)
  @HttpCode(400)
  @HttpCode(401)
  async peekQueueMessages(
    @Param('id') queueId: string,
    @Body() connectionDto: ConnectionDto,
  ) {
    if (
      connectionDto == null ||
      connectionDto == undefined ||
      queueId == null ||
      queueId == undefined
    )
      return new BadRequestException();
    return await this.messageService.peekMessages(
      connectionDto.connectionSecret,
      queueId,
    );
  }

  @Post('queues/:id/receive')
  @HttpCode(200)
  @HttpCode(400)
  @HttpCode(401)
  async receiveQueuedMessages(
    @Param('id') queueId: string,
    @Body() receiveMessage: ReceiveMessagesDto,
  ) {
    if (
      receiveMessage == null ||
      receiveMessage == undefined ||
      queueId == null ||
      queueId == undefined
    )
      return new BadRequestException();
    return await this.messageService.receiveMessages(
      receiveMessage.connectionSecret,
      queueId,
      receiveMessage.SequenceNumber,
    );
  }
}
