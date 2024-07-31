import { ApiProperty } from '@nestjs/swagger';

export class ApplyResetPasswordCodeResponseDto {
  @ApiProperty()
  readonly token: string;
}
