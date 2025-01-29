import { Injectable } from '@nestjs/common';
import { ServerStatus } from './dto/server-status';

@Injectable()
export class AppService {
  isAlive(): ServerStatus {
    return {status: 'Healthy'};
  }
}
