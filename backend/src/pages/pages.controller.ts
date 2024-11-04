import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put, UseInterceptors, UploadedFiles,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Page } from './schemas/page.schema';
import { WithoutAuth } from '../auth/decorators/without-auth.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {
  }

  @ApiResponse({ type: [Page] })
  @WithoutAuth()
  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @ApiResponse({ type: Page })
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() createLanguageDto: CreatePageDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.pagesService.create(createLanguageDto, files);
  }

  @ApiResponse({ type: Page })
  @Put(':id')
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdatePageDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.pagesService.update(id, updateLanguageDto, files);
  }

  @ApiResponse({ type: Page })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(id);
  }

  @ApiResponse({ type: [Page] })
  @Post('remove-by-ids')
  removeByIds(@Body('ids') ids: Array<string>) {
    return this.pagesService.removeByIds(ids);
  }
}
