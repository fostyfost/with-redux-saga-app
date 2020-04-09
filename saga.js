import fetch from 'isomorphic-unfetch';
import {ActionType, addUsersAction, beforeAddUsersAction, reducer1Action, reducer2Action, saga2Action} from './actions'
import {all, call, fork, put, spawn, takeEvery, takeLatest} from "@redux-saga/core/effects";

function* watchAndLog() {
  yield takeEvery('*', function log(action) {
    console.log('action', action.type);
  });
}

function* saga1Watcher() {
  yield takeLatest(ActionType.SAGA1, function* saga1({ payload }) {
    console.log('-----saga1', payload);
    yield put(reducer1Action(payload));
    yield put(saga2Action('THIS IS SAGA 2 ACTION PAYLOAD'));
  });
}

function* saga2Watcher() {
  yield takeLatest(ActionType.SAGA2, function* saga2({ payload }) {
    console.log('-----saga2', payload);
    yield put(reducer2Action(payload));
  });
}

const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  return await res.json();
}
function* getUsersSagaWatcher() {
  yield takeLatest(ActionType.GET_USERS, function* getUsersSaga() {
    console.log('-----getUsersSaga');
    try {
      const data = yield call(fetchUsers)
      // it works
      yield fork(addUserSaga, { payload: data })
      // it does not work
      // yield put(beforeAddUsersAction(data))
    } catch (err) {
      console.warn(err.message)
    }
  })
}

function* addUserSaga({ payload }) {
  console.log('-----beforeAddUserSaga', payload);
  yield put(addUsersAction(payload))
}
function* beforeAddUserSagaWatcher() {
  yield takeLatest(ActionType.BEFORE_ADD_USERS, addUserSaga)
}

function* watchersForks() {
  yield fork(beforeAddUserSagaWatcher);
  yield fork(getUsersSagaWatcher);
  yield fork(saga2Watcher);
  yield fork(saga1Watcher);
}

function* rootSaga() {
  yield spawn(watchAndLog);
  yield fork(watchersForks);
}

export default rootSaga
