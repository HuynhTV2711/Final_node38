import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('NguoiDung')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: CreateUserDto })
  @Post('/sign-up')
  create(@Body() body) {
    return this.userService.create(body);
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
}
