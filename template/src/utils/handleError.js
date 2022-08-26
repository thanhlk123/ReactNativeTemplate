import { RESPONSE_CODE } from 'constants/errors';

function convertDataError(error, msg) {
  let { code, message, data, status } = error;
  switch (status) {
    case RESPONSE_CODE.NOT_FOUND:
      code = RESPONSE_CODE.NOT_FOUND;
      break;
  }
  const result = RESPONSE_CODE[code];
  if (result) {
    return {
      code: data && data.code,
      message: msg ? msg + result : result,
      status,
    };
  }
  if (message && message.search('Cannot read property') >= 0) {
    return {
      code: RESPONSE_CODE.UNDEFINED,
      message: 'errMessage.query_error',
      status,
    };
  }
  if (code === 'auth/network-request-failed') {
    return {
      code: RESPONSE_CODE.NOT_FOUND,
      message: 'errMessage.network_error',
      status,
    };
  }
  if (
    (message && message.search('Network Error') >= 0) ||
    (msg && msg.search('Network Error') >= 0)
  ) {
    return {
      code: RESPONSE_CODE.NOT_FOUND,
      message: 'errMessage.network_error',
      status,
    };
  }
  return {
    code: code || (data && data?.error?.code),
    message:
      message || (data && (data.message || data?.error?.message)) || 'errMessage.error_tryAgain',
    status,
  };
}

export function handleErrorMessage(err, msg) {
  const { response } = err;
  if (response) {
    return convertDataError(response, msg);
  } else {
    return convertDataError(err, msg);
  }
}
