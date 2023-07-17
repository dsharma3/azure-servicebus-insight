import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { routes } from './app.routes';
import { AppService } from './app.service';
import { ConnectionsModule } from './modules/connections/connections.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [
    ConnectionsModule,
    MessagesModule,
    RouterModule.register(routes),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:
        '/Users/divyeshsharma/Documents/Code/personal/azure-servicebus-insight/backend/src/azureservicebusDB.sqlite3',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
