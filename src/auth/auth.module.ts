import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { RoleGuards } from 'src/strategy/role.stratey';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,RoleGuards],
  imports: [JwtModule.register({})],
})
export class AuthModule {}
