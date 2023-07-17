import { Routes } from '@nestjs/core';
import { ConnectionsModule } from './modules/connections/connections.module';
import { MessagesModule } from './modules/messages/messages.module';

export const routes: Routes = [
  {
    path: '/api',
    children: [
      {
        path: 'connections',
        module: ConnectionsModule,
      },
      {
        path: 'messages',
        module: MessagesModule,
      },
    ],
  },
];
