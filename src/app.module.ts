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
import { AuthModule } from './auth/auth.module';
import { LocalhostModule } from './localhost/localhost.module';


@Module({
  imports: [
    UserPreferencesModule,
    ConfigModule.forRoot({
      load: [configuration]
    }),
    NotificationsModule,
    HttpModule,
    AuthModule,
    LocalhostModule 
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserPreferencesService,
    NotificationService
  ],
})
export class AppModule {}
