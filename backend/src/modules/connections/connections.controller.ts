import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ConnectionsEntity } from 'src/entities/connection.entity';
import { ConnectionsService } from './connections.service';

@Controller()
export class ConnectionsController {
  constructor(private connectionService: ConnectionsService) {}

  @Get('')
  async getAllConnections(): Promise<ConnectionsEntity[]> {
    return await this.connectionService.getAll();
  }

  @Post('')
  @HttpCode(201)
  async createConnection(@Body() connection: ConnectionsEntity) {
    await this.connectionService.create(connection);
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteConnection(@Param('id') id: number) {
    await this.connectionService.delete(id);
  }
}
