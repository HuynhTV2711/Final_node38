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
          message: 'Created user successfully',
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
    let { pass_word, name } = body;
    let encodePass = bcrypt.hashSync(pass_word, 2);
    let newAvatar = initAvatar(name);
    let updateUser = { ...body, pass_word: encodePass, avatar: newAvatar };
    await this.prisma.nguoiDung.update({
      where: {
        id: id,
      },
      data: updateUser,
    });

    return `update user ${id} successfull! `;
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
    try {
      await this.prisma.nguoiDung.delete({
        where: {
          id: id,
        },
      });

      return `delete user ${id} successfull! `;
    } catch (error) {
      return error;
    }
  }
  async upload(
    filename: string,
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<string> {
    let upload = { ...updateUserDto };
    upload.avatar = filename;
    await this.prisma.nguoiDung.update({
      where: {
        id: id,
      },
      data: upload,
    });
    return `Upload avatar id:${id} success !`;
  }
}
