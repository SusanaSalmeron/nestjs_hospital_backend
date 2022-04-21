import { Module } from '@nestjs/common';
import { ManagementController } from 'src/controllers/management/management.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ManagementService } from '../services/management.service';

@Module({
  providers: [ManagementService],
  controllers: [ManagementController],
  imports: [DatabaseModule]
})
export class ManagementModule { }
