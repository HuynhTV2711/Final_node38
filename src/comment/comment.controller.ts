import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("BinhLuan")
@Controller('/api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll():Promise<any> {
    return this.commentService.findAll();
  }

  @Post("/create-comment")
  create(@Body() createCommentDto: CreateCommentDto ) : Promise<string> {
    return this.commentService.create(createCommentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
