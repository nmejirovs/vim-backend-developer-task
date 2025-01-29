import { Module } from '@nestjs/common';
import { UserPreferencesController } from './user-preferences.controller';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';

@Module({
  controllers: [UserPreferencesController],
  providers: [UserPreferencesService]
})
export class UserPreferencesModule {}
