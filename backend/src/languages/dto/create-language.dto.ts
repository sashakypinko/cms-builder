import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Validate,
  IsBoolean,
} from 'class-validator';
import { IsUniqueValidator } from '../validators/is-unique.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageDto {
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsUniqueValidator)
  readonly code: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly isActive: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly isMain: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly translations?: string;
}
