import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesEntity } from 'src/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesEntity]), MessagesEntity],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
