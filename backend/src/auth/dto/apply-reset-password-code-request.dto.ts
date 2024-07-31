import { ApiProperty } from '@nestjs/swagger';

export class ApplyResetPasswordCodeRequestDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly code: string;
}
