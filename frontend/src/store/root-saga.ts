import { all, fork } from 'redux-saga/effects';

import { watchNotifications } from './notifications/sagas';
import { watchAuth } from './auth/sagas';
import { watchUsers } from './users/sagas';
import { watchLanguages } from './languages/sagas';

const rootSaga = function* () {
  yield all([fork(watchAuth), fork(watchNotifications), fork(watchUsers), fork(watchLanguages)]);
};

export default rootSaga;
