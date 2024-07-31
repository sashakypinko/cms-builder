import ApiService from '../api-service';
import { type AxiosResponse } from 'axios';
import { type AuthResponseDto } from './dto/auth-response.dto';
import { type SignInRequestDto } from './dto/sign-in-request.dto';
import { type SignUpRequestDto } from './dto/sign-up-request.dto';
import { IUser } from '../user/dto/user.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { ApplyResetPasswordCodeResponseDto } from './dto/apply-reset-password-code-response.dto';
import { ApplyResetPasswordCodeRequestDto } from './dto/apply-reset-password-code-request.dto';

class AuthApiService extends ApiService {
  getAuthUser = async (): Promise<AxiosResponse<IUser>> => await this.get('get-auth-user').then((res) => res.data);

  signIn = async (data: SignInRequestDto): Promise<AxiosResponse<AuthResponseDto>> =>
    await this.post('signin', data).then((res) => res.data);

  signUp = async (data: SignUpRequestDto): Promise<AxiosResponse<AuthResponseDto>> =>
    await this.post('signup', data).then((res) => res.data);

  logout = async (): Promise<AxiosResponse> => await this.get('logout').then((res) => res.data);

  verify = async (code: string): Promise<AxiosResponse> => await this.get(`verify/${code}`).then((res) => res.data);

  sendResetPasswordCode = async (email: string): Promise<AxiosResponse> =>
    await this.post('send-reset-password-code', { email }).then((res) => res.data);

  applyResetPasswordCode = async (data: ApplyResetPasswordCodeRequestDto): Promise<ApplyResetPasswordCodeResponseDto> =>
    await this.post('apply-reset-password-code', data).then((res) => res.data);

  resetPassword = async (data: ResetPasswordRequestDto): Promise<AxiosResponse> =>
    await this.post('reset-password', data).then((res) => res.data);
}

export const AuthApi = new AuthApiService('auth');
