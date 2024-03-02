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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import loginDTO from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiBody({ type: loginDTO })
  @Post('/login')
  async login(@Body() body, @Res() res): Promise<any> {
    let data = await this.authService.login(body);
    res.status(data.status).json(data);
  }
}
