import { SignInRequestDto } from '../../services/api/auth/dto/sign-in-request.dto';
import { SignUpRequestDto } from '../../services/api/auth/dto/sign-up-request.dto';
import { IUser } from '../../services/api/user/dto/user.dto';

export type AuthState = {
  authUser: IUser | null;
  loading: boolean;
  error: any;
};

export type SignUpActionPayload = {
  data: SignUpRequestDto;
  onSuccess: () => void;
  onError: (error: any) => void;
};

export type SignInActionPayload = {
  data: SignInRequestDto;
  onSuccess: () => void;
  onError: (error: any) => void;
};

export type EmailVerifyActionPayload = string;
