import { put, take, takeEvery } from 'redux-saga/effects';
import Action from '../actions/action.interface';
// import { getNotifications, getNotificationsSuccess } from '../actions/notifications';
// import { createWebSocketConnection } from '../../utils/web-socket';

function* handleWebSocketMessage(action: Action) {
  // yield put(getNotificationsSuccess(action.payload));
}

export function* notifications() {
  // const socket: WebSocket = yield createWebSocketConnection(process.env.REACT_APP_WS_URL || '');
  // yield takeEvery('WEBSOCKET_MESSAGE', handleWebSocketMessage);
  // while (true) {
  //   const action: { payload: any } = yield take('SEND_WEBSOCKET_MESSAGE');
  //   socket.send(action.payload);
  // }
}
