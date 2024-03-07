import StorageService from './storage-service';
import { type IUser } from '../api/user/dto/user.dto';
import { type ThemeEnum } from '../../config/theme/enums/theme.enum';

class AuthStorageService extends StorageService {
  storeUser = (user: IUser): void => {
    this.store('user', user);
  };

  storeAccessToken = (token: string | undefined): void => {
    this.store('accessToken', token);
  };

  storeRefreshToken = (token: string | undefined): void => {
    this.store('refreshToken', token);
  };

  getUser = (): IUser | null => this.get('user');

  getAccessToken = (): string | null => this.get('accessToken');

  getRefreshToken = (): string | null => this.get('refreshToken');

  removeUser = (): void => {
    this.remove('user');
  };

  removeAccessToken = (): void => {
    this.remove('accessToken');
  };

  removeRefreshToken = (): void => {
    this.remove('refreshToken');
  };

  changeThemeMode = (mode: ThemeEnum): void => {
    this.store('mode', mode);
  };

  getThemeMode = (): ThemeEnum | null => this.get('mode');

  setLanguage = (lang: string): void => {
    this.store('lang', lang);
  };

  getLanguage = (): string | undefined => this.get('lang');
}

export const AuthStorage = new AuthStorageService();
