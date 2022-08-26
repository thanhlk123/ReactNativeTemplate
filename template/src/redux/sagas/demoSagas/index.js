import {DEMO} from 'actionsType';
import {takeLatest} from 'redux-saga/effects';

import {demoCallApiSaga} from './saga';

export default function* sagas() {
  yield takeLatest(DEMO.CALL_API.HANDLER, demoCallApiSaga);
}
