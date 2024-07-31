import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../users/schemas/user.schema';

export class CreateNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsOptional()
  route?: string;
}
