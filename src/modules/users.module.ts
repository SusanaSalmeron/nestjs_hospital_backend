import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { UsersController } from '../controllers/users/users.controller';
import { DatabaseModule } from '../database/database.module';
import { TokenService } from '../services/token.service';
import { PatientsService } from '../services/patients.service';
import { ValidationService } from '../services/validation.service';
import { UsersService } from '../services/users.service';

@Module({
    providers: [UsersService, TokenService, ConfigService, PatientsService, ValidationService],
    controllers: [UsersController],
    imports: [DatabaseModule]
})
export class UsersModule { }
