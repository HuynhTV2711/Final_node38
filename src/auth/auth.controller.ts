import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import loginDTO from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuards } from 'src/strategy/role.stratey';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiBody({ type: loginDTO })
  @Post('/login')
  async login(@Body() body: loginDTO, @Res() res): Promise<any> {
    let data = await this.authService.login(body);
    res.status(data.status).json(data);
  }
  @ApiBearerAuth()
  @UseGuards(RoleGuards)
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: SignUpDto })
  @Post('/create-user')
  async create(@Body() body: SignUpDto, @Res() res): Promise<any> {
    let data = await this.authService.signUp(body);
    res.status(data.status).json(data);
  }
}
