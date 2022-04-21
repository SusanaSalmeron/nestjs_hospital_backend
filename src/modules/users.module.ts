import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { UsersController } from 'src/controllers/users/users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TokenService } from 'src/services/token.service';
import { PatientsService } from 'src/services/patients.service';
import { ValidationService } from 'src/services/validation.service';
import { UsersService } from 'src/services/users.service';

@Module({
    providers: [UsersService, TokenService, ConfigService, PatientsService, ValidationService],
    controllers: [UsersController],
    imports: [DatabaseModule]
})
export class UsersModule { }
