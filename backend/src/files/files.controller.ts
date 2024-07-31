import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { WithoutAuth } from '../auth/decorators/without-auth.decorator';
import * as process from 'process';

@Controller('files')
@WithoutAuth()
export class FileController {
  @Get(':fileName')
  getFile(@Param('fileName') fileName: string) {
    const file = createReadStream(
      join(process.cwd(), process.env.UPLOADS_DIR, fileName),
    );
    return new StreamableFile(file);
  }
}
