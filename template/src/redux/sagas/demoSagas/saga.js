import {callApiDemoFailure, callApiDemoSuccess} from 'actions/demos';
import {call, put} from 'redux-saga/effects';
import {apiDemo} from 'src/api/demoApi';

export function* demoCallApiSaga(obj) {
  const {onSuccess, onError} = obj;
  try {
    const res = yield call(apiDemo);
    if (res.status === 200 && res.data?.success) {
      yield put(callApiDemoSuccess(res.data));
      onSuccess?.();
    } else {
      yield put(callApiDemoFailure(res));
      onError?.(res.data?.message);
    }
  } catch (error) {
    yield put(callApiDemoFailure(error));
    onError?.();
  }
}
