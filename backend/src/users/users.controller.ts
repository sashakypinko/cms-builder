import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { ApiResponse } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import * as process from 'process';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ type: [User] })
  @Get()
  findAll(): Promise<UserDocument[]> {
    return this.usersService.findAll();
  }

  @ApiResponse({ type: User })
  @Get(':id')
  findById(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.findById(id);
  }

  @ApiResponse({ type: [User] })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({ type: [User] })
  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    if (file) {
      updateUserDto.avatar = `${process.env.APP_URL}/files/${file.filename}`;
    }
    return this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({ type: [User] })
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.remove(id);
  }

  @ApiResponse({ type: [User] })
  @Roles(Role.ADMIN)
  @Post(':id/activate')
  activate(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.activate(id);
  }

  @ApiResponse({ type: [User] })
  @Roles(Role.ADMIN)
  @Post(':id/deactivate')
  deactivate(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.deactivate(id);
  }
}
