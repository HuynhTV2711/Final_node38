import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client'


@Injectable()
export class UserService {
  prisma = new PrismaClient()
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

 async findAll():Promise<any>  {
  let data = await this.prisma.nguoiDung.findMany({
  });

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
