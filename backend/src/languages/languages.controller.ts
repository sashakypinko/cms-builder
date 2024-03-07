import {Controller, Get, Post, Body, Param, Delete, UseGuards, Put} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import {AuthGuard} from "../auth/auth.guard";
import {ApiResponse} from "@nestjs/swagger";
import {Language} from "./schemas/language.schema";
import {WithoutAuth} from "../auth/without-auth.decorator";

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @ApiResponse({type: [Language]})
  @WithoutAuth()
  @Get()
  findAll() {
    return this.languagesService.findAll();
  }

  @ApiResponse({type: Language})
  @WithoutAuth()
  @Get(':code')
  findByCode(@Param('code') code: string) {
    return this.languagesService.findByCode(code);
  }

  @ApiResponse({type: Language})
  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @ApiResponse({type: Language})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateLanguageDto: UpdateLanguageDto) {
    return this.languagesService.update(id, updateLanguageDto);
  }

  @ApiResponse({type: Language})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languagesService.remove(id);
  }

  @ApiResponse({type: [Language]})
  @Post('remove-by-ids')
  removeByIds(@Body('ids') ids: Array<string>) {
    return this.languagesService.removeByIds(ids);
  }

  @ApiResponse({type: [Language]})
  @Post('remove-translation-keys')
  removeTranslationKey(@Body('keys') keys: string[]) {
    return this.languagesService.removeTranslationKey(keys);
  }
}
