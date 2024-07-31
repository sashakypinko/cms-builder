import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordRequestDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly token: string;

  @ApiProperty()
  readonly password: string;
}
