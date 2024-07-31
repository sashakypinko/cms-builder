import notificationsReducer from './notifications/slice';
import authReducer from './auth/slice';
import usersReducer from './users/slice';
import languagesReducer from './languages/slice';
import uiReducer from './ui/slice';

const rootReducers = {
  auth: authReducer,
  users: usersReducer,
  languages: languagesReducer,
  notifications: notificationsReducer,
  ui: uiReducer,
};

export default rootReducers;
