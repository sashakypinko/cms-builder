import { type IUser } from '../../user/dto/user.dto';

export interface AuthResponseDto {
  accessToken?: string;
  refreshToken?: string;
  user: IUser;
}
