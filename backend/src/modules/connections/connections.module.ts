import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionsEntity } from 'src/entities/connection.entity';
import { Repository } from 'typeorm';
import { ConnectionsController } from './connections.controller';
import { ConnectionsService } from './connections.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectionsEntity]), ConnectionsModule],
  controllers: [ConnectionsController],
  providers: [ConnectionsService, Repository],
})
export class ConnectionsModule {}
