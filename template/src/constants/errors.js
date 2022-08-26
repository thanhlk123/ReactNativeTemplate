import React from 'react';

export const RESPONSE_CODE = {
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIME_OUT: 408,
  UNAUTHORIZED_STATUS: 401,
  UNDEFINED: 'UNDEFINED',
  UNKNOWN: 'UNKNOWN',
  // auth
  INVALID_PHONE_NUMBER: 'auth/invalid-phone-number',
  INVALID_USER_VERIFICATION_CODE: 'auth/invalid-verification-code',
  NETWORK_REQUEST_FAILED: 'auth/network-request-failed',
  AUTH_UNKNOWN: 'auth/unknown',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  AUTH_SESSION_EXPIRED: 'auth/session-expired',
};
