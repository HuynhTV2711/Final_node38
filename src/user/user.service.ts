import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { initAvatar } from 'src/utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  prisma = new PrismaClient();
  async create(body: CreateUserDto) {
    try {
      let { email, pass_word, name } = body;
      let checkEmail = await this.prisma.nguoiDung.findFirst({
        where: {
          email: email,
        },
      });

      if (!checkEmail) {
        let encodePass = bcrypt.hashSync(pass_word, 2);
        let newAvatar = initAvatar(name);
        let newUser = {
          ...body,
          avatar: newAvatar,
          role: 'user',
          pass_word: encodePass,
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

  async update(body: UpdateUserDto, id: number): Promise<any> {
    await this.prisma.nguoiDung.update({
      where: {
        id: id,
      },
    });

    return `delete user ${id} successfull! `;
  }

  async findAll(): Promise<any> {
    let data = await this.prisma.nguoiDung.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birth_day: true,
        gender: true,
        role: true,
        skill: true,
        certification: true,
        avatar: true,
      },
    });
    return data;
  }

  async findOne(id: number): Promise<any> {
    let data = await this.prisma.nguoiDung.findMany({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birth_day: true,
        gender: true,
        role: true,
        skill: true,
        certification: true,
        avatar: true,
      },
    });
    return data;
  }
  async userPaginationSearch(
    skip: number,
    numSize: number,
    name: string,
  ): Promise<any> {
    let data = await this.prisma.nguoiDung.findMany({
      skip: skip,
      take: numSize,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birth_day: true,
        gender: true,
        role: true,
        skill: true,
        certification: true,
        avatar: true,
      },
      where: {
        name: {
          contains: name,
        },
      },
    });
    return data;
  }

  async userPagination(skip: number, numSize: number): Promise<any> {
    let data = await this.prisma.nguoiDung.findMany({
      skip: skip,
      take: numSize,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birth_day: true,
        gender: true,
        role: true,
        skill: true,
        certification: true,
        avatar: true,
      },
    });
    return data;
  }

  async remove(id: number): Promise<any> {
    await this.prisma.nguoiDung.delete({
      where: {
        id: id,
      },
    });

    return `delete user ${id} successfull! `;
  }
}
