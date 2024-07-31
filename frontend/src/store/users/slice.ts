import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../services/api/user/dto/user.dto';
import { UserActionPayload, UsersState } from './types';

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state: UsersState) => {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess: (state: UsersState, { payload: users }: PayloadAction<IUser[]>) => {
      state.loading = false;
      state.users = users;
    },
    getUsersError: (state: UsersState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    deleteUser: (state: UsersState, action: PayloadAction<UserActionPayload>) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state: UsersState) => {
      state.loading = false;
    },
    deleteUserError: (state: UsersState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    activateUser: (state: UsersState, action: PayloadAction<UserActionPayload>) => {
      state.loading = true;
      state.error = null;
    },
    activateUserSuccess: (state: UsersState) => {
      state.loading = false;
    },
    activateUserError: (state: UsersState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    deactivateUser: (state: UsersState, action: PayloadAction<UserActionPayload>) => {
      state.loading = true;
      state.error = null;
    },
    deactivateUserSuccess: (state: UsersState) => {
      state.loading = false;
    },
    deactivateUserError: (state: UsersState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  getUsers,
  getUsersSuccess,
  getUsersError,
  deleteUser,
  deleteUserSuccess,
  deleteUserError,
  activateUser,
  activateUserSuccess,
  activateUserError,
  deactivateUser,
  deactivateUserSuccess,
  deactivateUserError,
} = usersSlice.actions;

export default usersSlice.reducer;
