import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('NguoiDung')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: CreateUserDto })
  @Post('/sign-up')
  create(@Body() body) {
    return this.userService.create(body);
  }

  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @Put('/update-user/:id')
  update(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.userService.update(body, +id);
  }

  @Get()
  findAll(): Promise<any> {
    return this.userService.findAll();
  }

  @ApiParam({ name: 'id', required: true, description: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiParam({ name: 'page', required: false, description: 'page number' })
  @ApiParam({ name: 'size', required: false, description: 'page size' })
  @ApiParam({ name: 'name', required: true, description: 'name' })
  @Get('/:page/:size/:name')
  userPaginationSearch(
    @Param('page') page,
    @Param('size') size,
    @Param('name') name,
  ): Promise<any> {
    let numPage = page * 1;
    let numSize = size * 1;
    let skip = (numPage - 1) * size;
    return this.userService.userPaginationSearch(skip, numSize, name);
  }

  @ApiParam({ name: 'page', required: true, description: 'page number' })
  @ApiParam({ name: 'size', required: true, description: 'page size' })
  @Get('/:page/:size')
  userPagination(@Param('page') page, @Param('size') size): Promise<any> {
    let numPage = page * 1;
    let numSize = size * 1;
    let skip = (numPage - 1) * size;
    return this.userService.userPagination(skip, numSize);
  }

  @ApiParam({ name: 'id', required: true, description: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @Post('upload-avatar/:id')
  @ApiConsumes('multipart/form-data') // Specify the media type for file upload
  @ApiBody({
    description: 'Upload a file',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) => {
          callback(null, new Date().getTime() + `${file.originalname}`);
        },
      }),
    }),
  )
  upload(
    @UploadedFile('file') file,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return this.userService.upload(file.filename, +id, updateUserDto);
  }
}
