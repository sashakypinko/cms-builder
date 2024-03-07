import ApiService from '../api-service';
import { type AxiosResponse } from 'axios';
import { type AuthResponseDto } from './dto/auth-response.dto';
import { type SignInRequestDto } from './dto/sign-in-request.dto';
import { type SignUpRequestDto } from './dto/sign-up-request.dto';

class AuthApiService extends ApiService {
  signIn = async (data: SignInRequestDto): Promise<AxiosResponse<AuthResponseDto>> =>
    await this.post('signin', data).then((res) => res.data);

  signUp = async (data: SignUpRequestDto): Promise<AxiosResponse<AuthResponseDto>> =>
    await this.post('signup', data).then((res) => res.data);

  logout = async (): Promise<AxiosResponse> => await this.get('logout').then((res) => res.data);

  verify = async (code: string): Promise<AxiosResponse> =>
    await this.get(`verify/${code}`).then((res) => res.data);
}

export const AuthApi = new AuthApiService('auth');
