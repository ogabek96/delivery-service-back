import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
