export const asyncTypes = (action) => ({
  ORIGIN: action,
  HANDLER: `${action}_HANDLER`,
  REQUEST: `${action}_REQUEST`,
  PENDING: `${action}_PENDING`,
  START: `${action}_START`,
  MORE: `${action}_MORE`,
  SUCCESS: `${action}_SUCCESS`,
  FAILURE: `${action}_FAILURE`,
  ERROR: `${action}_ERROR`,
  CLEAR: `${action}_CLEAR`,
  STORE: `${action}_STORE`,
  END: `${action}_END`,
});

export const SETTINGS = {
  CHANGE_LANGUAGE: asyncTypes('SYSTEM/CHANGE_LANGUAGE'),
  SET_LOADING: asyncTypes('SYSTEM/SET_LOADING'),
};

export const DEMO = {
  CALL_API: asyncTypes('DEMO/CALL_API'),
};
