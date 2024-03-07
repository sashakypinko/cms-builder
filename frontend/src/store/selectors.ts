import { type AppState } from './rootReducer';
import { type IUser } from '../services/api/user/dto/user.dto';

export const selectAuthUser = (state: AppState): IUser | undefined => state.auth.authData?.user;
export const selectAuth = (state: AppState): App.Store.Auth => state.auth;

export const selectLanguages = (state: AppState): App.Store.Languages => state.languages;

export const selectUsers = (state: AppState): App.Store.Users => state.users;

export const selectSuccessSnackbar = (state: AppState): string => state.ui.successSnackbar;
export const selectErrorSnackbar = (state: AppState): string => state.ui.errorSnackbar;
export const selectInfoSnackbar = (state: AppState): string => state.ui.infoSnackbar;
