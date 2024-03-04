import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import loginDTO from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { initAvatar } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  prisma = new PrismaClient();
  async login(body: loginDTO): Promise<any> {
    try {
      let { email, pass_word } = body;
      let checkEmail = await this.prisma.nguoiDung.findFirst({
        where: {
          email: email,
        },
      });
      if (checkEmail) {
        let isCorrectPass = bcrypt.compareSync(pass_word, checkEmail.pass_word);
        if (isCorrectPass) {
          let payload = {
            user_id: checkEmail.id,
            email: checkEmail.email,
            role: checkEmail.role,
          };
          let token = this.jwtService.sign(payload, {
            secret: this.configService.get('SECRET_KEY'),
            expiresIn: this.configService.get('EXPIRES_IN'),
          });
          return {
            status: 200,
            message: 'Login successfully!',
            data: token,
          };
        } else {
          return {
            status: 400,
            message: 'Password incorrect!',
          };
        }
      } else {
        return {
          status: 400,
          message: 'Email does not exist',
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }
  async signUp(body: SignUpDto): Promise<any> {
    try {
      let {
        email,
        pass_word,
        name,
        role,
        phone,
        birth_day,
        gender,
        skill,
        certification,
        avatar,
      } = body;
      let checkEmail = await this.prisma.nguoiDung.findFirst({
        where: {
          email: email,
        },
      });

      if (!checkEmail) {
        let encodePass = bcrypt.hashSync(pass_word, 2);
        let newAvatar = initAvatar(name);
        let newUser = {
          email,
          pass_word: encodePass,
          name,
          role,
          phone,
          birth_day,
          gender,
          skill,
          certification,
          avatar: newAvatar,
        };
        await this.prisma.nguoiDung.create({
          data: newUser,
        });
        return {
          status: 200,
          message: 'Signup successfully',
        };
      } else {
        return {
          status: 500,
          message: 'Email already exists',
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }
}
