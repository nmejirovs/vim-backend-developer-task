import { Module } from '@nestjs/common';
import { LocalhostGuard } from './localhost.guard';

@Module({
    providers: [LocalhostGuard]
})
export class LocalhostModule {}
