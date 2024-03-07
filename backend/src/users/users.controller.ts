import {Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User, UserDocument} from "./schemas/user.schema";
import {ApiResponse} from "@nestjs/swagger";
import {Roles} from "../roles/roles.decorator";
import {Role} from "../roles/enums/role.enum";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({type: [User]})
  @Get()
  findAll(): Promise<UserDocument[]> {
    return this.usersService.findAll();
  }

  @ApiResponse({type: User})
  @Get(':id')
  findById(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.findById(id);
  }

  @ApiResponse({type: [User]})
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({type: [User]})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({type: [User]})
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.remove(id);
  }

  @ApiResponse({type: [User]})
  @Roles(Role.ADMIN)
  @Post('activate/:id')
  activate(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.activate(id);
  }

  @ApiResponse({type: [User]})
  @Roles(Role.ADMIN)
  @Post('deactivate/:id')
  deactivate(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.deactivate(id);
  }
}
