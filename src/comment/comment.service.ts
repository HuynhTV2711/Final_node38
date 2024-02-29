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

  async create(createCommentDto: CreateCommentDto ) : Promise<string> {
    let newComment = {...createCommentDto};
    await this.prisma.binhLuan.create({
      data: newComment
    })
    return "Create Comment Successful"
  }

  async findOne(id: number): Promise<any> {
    let data = await this.prisma.binhLuan.findMany({
    
      where: {
        id: id
      }
    });
    return data;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

 async remove(id: number): Promise <any>{
  await this.prisma.binhLuan.delete({
    where: {
      id: id
    }
  });

  return `delete comment ${id} suscessfull! `;
  }
}
