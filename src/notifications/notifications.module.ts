import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule,
    HttpModule
  ],
  controllers: [NotificationsController]
})
export class NotificationsModule {}
