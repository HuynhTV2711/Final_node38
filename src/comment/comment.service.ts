import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommentService {
  prisma = new PrismaClient()

  async findAll(): Promise<any> {
    let data = await this.prisma.binhLuan.findMany({
    });

    return data;
  }

  async create(createCommentDto: CreateCommentDto): Promise<string> {
    let newComment = { ...createCommentDto };
    await this.prisma.binhLuan.create({
      data: newComment
    })
    return `Create Comment Successful`
  }

  async findOne(maCongViec: number): Promise<any> {
    let data = await this.prisma.binhLuan.findMany({

      where: {
        id: maCongViec
      }
    });
    return data;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<string> {
    let updateComment = { ...updateCommentDto };
     await this.prisma.binhLuan.update({
      where: {
        id: id
      },
      data: updateComment
    });
    return `update id:${id} comment success !`
  }

  async remove(id: number): Promise<any> {
    await this.prisma.binhLuan.delete({
      where: {
        id: id
      }
    });

    return `delete comment ${id} suscessfull! `;
  }
}
