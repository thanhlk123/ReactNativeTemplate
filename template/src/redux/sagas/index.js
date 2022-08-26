import {all, fork} from 'redux-saga/effects';

import demoSagas from './demoSagas';

export default function* rootSaga() {
  yield all([fork(demoSagas)]);
}
