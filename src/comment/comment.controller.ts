import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("BinhLuan")
@Controller('/api/binh-luan')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }


  @Get()
  findAll(): Promise<any> {
    return this.commentService.findAll();
  }

  @Post("")
  create(@Body() createCommentDto: CreateCommentDto): Promise<string> {
    return this.commentService.create(createCommentDto);
  }



  @ApiParam({ name: "id", required: true, description: "id" })
  @ApiHeader({ name: "token", required: true, description: "token" })
  //@UseGuards(AuthGuard("jwt")) 
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<string> {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }

  @ApiParam({ name: "MaCongViec", required: true, description: "MaCongViec" })
  @Get('/lay-binh-luan-theo-cong-viec/:MaCongViec')
  findOne(@Param('MaCongViec') maCongViec: string): Promise<any> {
    return this.commentService.findOne(+maCongViec);
  }
}
