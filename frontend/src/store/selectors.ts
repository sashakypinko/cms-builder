import { type IUser } from '../services/api/user/dto/user.dto';
import { type RootState } from './store';
import { NotificationsState } from './notifications/types';
import { AuthState } from './auth/types';
import { UsersState } from './users/types';
import { LanguagesState } from './languages/types';

export const selectAuthUser = (state: RootState): IUser | null => state.auth.authUser;
export const selectAuth = (state: RootState): AuthState => state.auth;

export const selectLanguages = (state: RootState): LanguagesState => state.languages;

export const selectUsers = (state: RootState): UsersState => state.users;

export const selectNotifications = (state: RootState): NotificationsState => state.notifications;

export const selectSuccessSnackbar = (state: RootState): string => state.ui.successSnackbar;
export const selectErrorSnackbar = (state: RootState): string => state.ui.errorSnackbar;
export const selectInfoSnackbar = (state: RootState): string => state.ui.infoSnackbar;
