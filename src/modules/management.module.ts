import { Module } from '@nestjs/common';
import { ManagementController } from 'src/controllers/management/management.controller';
import { DatabaseModule } from 'src/database/database.module';
import { EmailService } from 'src/services/email.service';
import { ManagementService } from '../services/management.service';

@Module({
  providers: [ManagementService, EmailService],
  controllers: [ManagementController],
  imports: [DatabaseModule]
})
export class ManagementModule { }
