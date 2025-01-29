import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config'
import { HttpModule } from '@nestjs/axios';
import configuration from './config/configuration'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';
import { UserPreferencesService } from './services/user-preferences/user-preferences.service';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationService } from './services/notification/notification.service';


@Module({
  imports: [
    UserPreferencesModule,
    ConfigModule.forRoot({
      load: [configuration]
    }),
    NotificationsModule,
    HttpModule 
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserPreferencesService,
    NotificationService
  ],
})
export class AppModule {}
