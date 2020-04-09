import {ActionType, reducer1Action, reducer2Action, saga2Action} from './actions'
import {fork, put, spawn, takeEvery, takeLatest} from "@redux-saga/core/effects";

function* watchAndLog() {
  yield takeEvery('*', function log(action) {
    console.log('action', action.type);
  });
}

function* saga1({ payload }) {
  console.log('-----saga1', payload);
  yield put(reducer1Action(payload));
  yield put(saga2Action('THIS IS SAGA 2 ACTION PAYLOAD'));
}

function* saga2({ payload }) {
  console.log('-----saga2', payload);
  yield put(reducer2Action(payload));
}

function* saga1Watcher() {
  yield takeLatest(ActionType.SAGA1, saga1);
}

function* saga2Watcher() {
  yield takeLatest(ActionType.SAGA2, saga2);
}

function* watchersForks() {
  yield fork(saga1Watcher);
  yield fork(saga2Watcher);
}

function* rootSaga() {
  yield spawn(watchAndLog);
  yield fork(watchersForks);
}

export default rootSaga
