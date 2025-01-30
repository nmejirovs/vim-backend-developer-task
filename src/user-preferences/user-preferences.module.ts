import { Module } from '@nestjs/common';
import { UserPreferencesController } from './user-preferences.controller';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';
import { AuthModule } from 'src/auth/auth.module';
import { LocalhostModule } from 'src/localhost/localhost.module';

@Module({
  imports: [AuthModule, LocalhostModule],
  controllers: [UserPreferencesController],
  providers: [UserPreferencesService]
})
export class UserPreferencesModule {}
