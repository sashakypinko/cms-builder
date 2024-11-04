import { IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePageDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  languageId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  readonly data: Record<string, any>;
}
