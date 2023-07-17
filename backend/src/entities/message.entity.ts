import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  JsonString: string;
}
