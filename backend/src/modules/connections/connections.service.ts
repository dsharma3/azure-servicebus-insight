import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionsEntity } from 'src/entities/connection.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(ConnectionsEntity)
    private connectionRepository: Repository<ConnectionsEntity>,
  ) {}

  async create(connection: ConnectionsEntity): Promise<ConnectionsEntity> {
    return await this.connectionRepository.save(connection);
  }

  async getAll(): Promise<ConnectionsEntity[]> {
    const connectionEntities = new Array<ConnectionsEntity>();
    connectionEntities.push(
      new ConnectionsEntity(1, 'Connection1', 'ConnectionString Sample'),
    );
    //return connectionEntities;
    return await this.connectionRepository.find();
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.connectionRepository.delete(id);
  }
}
