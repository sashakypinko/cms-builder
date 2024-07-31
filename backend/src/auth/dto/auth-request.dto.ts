import { ApiProperty } from '@nestjs/swagger';

export class AuthRequestDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}
