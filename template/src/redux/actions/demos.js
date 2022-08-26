import { DEMO } from 'actionsType';

export const callApiDemoHandler = (payload, onSuccess = () => {}, onError = () => {}) => {
  return {
    type: DEMO.CALL_API.HANDLER,
    payload,
    onSuccess,
    onError,
  };
};

export const callApiDemoSuccess = (payload) => {
  return {
    type: DEMO.CALL_API.SUCCESS,
    payload,
  };
};

export const callApiDemoFailure = (payload) => {
  return {
    type: DEMO.CALL_API.FAILURE,
    payload,
  };
};
