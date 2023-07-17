import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConnectionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column()
  SecretString: string;

  constructor(id: number, name: string, secretString: string) {
    this.id = id;
    this.Name = name;
    this.SecretString = secretString;
  }
}
