export const AuthState: App.Store.Auth = {
  authData: null,
  loading: false,
  error: null,
};

export const LanguagesState: App.Store.Languages = {
  languages: [],
  loading: false,
  error: null,
};

export const UsersState: App.Store.Users = {
  users: [],
  loading: false,
  error: null,
};

export const NotificationsState: App.Store.Notifications = {
  notifications: [],
  error: null,
};

export const UIState: App.Store.UI = {
  successSnackbar: '',
  errorSnackbar: '',
  infoSnackbar: '',
};
