import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/schemas/user.schema';

export class AuthResponseDto {
  @ApiProperty()
  readonly user: User;

  @ApiProperty()
  readonly accessToken: string;

  @ApiProperty()
  readonly refreshToken: string;
}
