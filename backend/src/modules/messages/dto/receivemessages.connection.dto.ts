import { ConnectionDto } from './connection.dto';
import Long from 'long';
export class ReceiveMessagesDto extends ConnectionDto {
  SequenceNumber: Long[];
}
