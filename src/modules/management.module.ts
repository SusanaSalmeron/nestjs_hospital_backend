import { Module } from '@nestjs/common';
import { ManagementController } from '../controllers/management/management.controller';
import { DatabaseModule } from '../database/database.module';
import { EmailService } from '../services/email.service';
import { ManagementService } from '../services/management.service';

@Module({
  providers: [ManagementService, EmailService],
  controllers: [ManagementController],
  imports: [DatabaseModule]
})
export class ManagementModule { }
