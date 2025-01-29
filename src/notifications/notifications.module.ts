import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { NotificationService } from '../services/notification/notification.service';
import { UserPreferencesService } from 'src/services/user-preferences/user-preferences.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationService,
    UserPreferencesService
  ]
})
export class NotificationsModule {}
