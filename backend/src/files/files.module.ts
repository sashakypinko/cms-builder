import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { storage, fileFilter } from './file-upload.utils';
import { FileController } from './files.controller';

@Module({
  imports: [
    MulterModule.register({
      storage,
      fileFilter,
    }),
  ],
  controllers: [FileController],
  exports: [MulterModule],
})
export class FilesModule {}
