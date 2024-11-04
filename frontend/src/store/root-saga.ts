import { all, fork } from 'redux-saga/effects';

import { watchNotifications } from './notifications/sagas';
import { watchAuth } from './auth/sagas';
import { watchUsers } from './users/sagas';
import { watchLanguages } from './languages/sagas';
import { watchPages } from './pages/sagas';

const rootSaga = function* () {
  yield all([fork(watchAuth), fork(watchNotifications), fork(watchUsers), fork(watchLanguages), fork(watchPages)]);
};

export default rootSaga;
