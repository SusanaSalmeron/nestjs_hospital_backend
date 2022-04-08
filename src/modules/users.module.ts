import { Module } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { UsersController } from 'src/controllers/users/users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TokenService } from 'src/services/token.service';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [UsersService, TokenService, ConfigService],
    controllers: [UsersController],
    imports: [DatabaseModule]
})
export class UsersModule { }
