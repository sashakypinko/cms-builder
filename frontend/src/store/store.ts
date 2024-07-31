import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.onSuccess', 'payload.onError'],
      },
    }).prepend(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ActionMeta = {
  onSuccess?: () => void;
  onError?: (errors: any) => void;
};
export type ActionWithMeta<T> = PayloadAction<T, string, ActionMeta>;

sagaMiddleware.run(rootSaga);
