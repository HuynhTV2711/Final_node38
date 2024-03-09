import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RoleGuards } from 'src/strategy/role.stratey';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('NguoiDung')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(RoleGuards)
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateUserDto })
  @Post('/create-user')
  create(@Body() body) {
    return this.userService.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @Put('/update-user/:id')
  update(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.userService.update(body, +id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<any> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'page', required: true, description: 'page number' })
  @ApiParam({ name: 'size', required: true, description: 'page size' })
  @Get('/:page/:size')
  userPagination(@Param('page') page, @Param('size') size): Promise<any> {
    let numPage = page * 1;
    let numSize = size * 1;
    let skip = (numPage - 1) * size;
    return this.userService.userPagination(skip, numSize);
  }

  @ApiBearerAuth()
  @UseGuards(RoleGuards)
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/upload-avatar')
  @ApiConsumes('multipart/form-data')
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
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    let id = req.user.user_id;
    return this.userService.upload(file.filename, +id, updateUserDto);
  }
}
