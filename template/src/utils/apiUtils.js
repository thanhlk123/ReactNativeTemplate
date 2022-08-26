import axios from 'axios';
import { handleErrorMessage } from 'utils/handleError';
import { store } from '../redux/store';
import cloneDeep from 'lodash/cloneDeep';
import { setLoading } from 'actions/settings';
import LocalStorage from 'utils/storage';
import { KEY_STORAGE } from 'constants/storage';
import { call } from 'redux-saga/effects';

const REQUEST_TIMEOUT = 60000;

axios.interceptors.request.use(async (config) => {
  const token = await LocalStorage.get(KEY_STORAGE.ACCESS_TOKEN);
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log('errror ===>', error);
    const originalRequest = cloneDeep(error.config);
    originalRequest._initConfig = originalRequest._initConfig || cloneDeep(error.config);
    originalRequest._initConfig._retryCount = originalRequest._retryCount || 0;
    originalRequest._retryCount = originalRequest._retryCount || 0;

    if (error.response.status === 401 && originalRequest._retryCount >= 3) {
      /**
       * Todo: logout
       */

      return Promise.reject(error);
    }

    /**
     * Todo handle call refresh token
     */
    if (error.response.status === 401 && (originalRequest._retryCount || 0) < 3) {
      originalRequest._initConfig._retryCount += 1;
      return axios(originalRequest._initConfig);
    }
    return Promise.reject(error);
  }
);

export default class APIUtils {
  static get(uri, params, isLoading = true) {
    if (isLoading) {
      store.dispatch(setLoading(true));
    }
    return new Promise((resolve, reject) => {
      axios
        .get(uri, { params })
        .then((response) => {
          resolve(response);
          setTimeout(() => {
            store.dispatch(setLoading(false));
          }, 300);
        })
        .catch((err) => {
          reject(handleErrorMessage(err));
          setTimeout(() => {
            store.dispatch(setLoading(false));
          }, 300);
        });
    });
  }

  static getWithoutAcceptText(uri, params, headers) {
    return new Promise((resolve, reject) =>
      axios
        .get(uri, {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            ...headers,
          },
          timeout: REQUEST_TIMEOUT,
          params,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(handleErrorMessage(err));
        })
    );
  }

  static post(uri, postData, isLoading = true, headers) {
    if (isLoading) {
      store.dispatch(setLoading(true));
    }

    return new Promise((resolve, reject) => {
      axios
        .post(uri, postData, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        })
        .then((response) => {
          resolve(response);
          setTimeout(() => {
            store.dispatch(setLoading(false));
          }, 300);
        })
        .catch((err) => {
          console.log('errr', { err });
          reject(handleErrorMessage(err));
          setTimeout(() => {
            store.dispatch(setLoading(false));
          }, 300);
        });
    });
  }

  static delete(uri, deleteBody, headers) {
    store.dispatch(setLoading({ isLoading: true }));
    return new Promise((resolve, reject) => {
      axios
        .delete(uri, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          data: deleteBody,
        })
        .then((response) => {
          resolve(response);
          setTimeout(() => {
            store.dispatch(setLoading(false));
          }, 300);
        })
        .catch((err) => {
          console.log('errr 4', { err });
          reject(handleErrorMessage(err));
          setTimeout(() => {
            store.dispatch(setLoading(false));
          }, 300);
        });
    });
  }

  static postFormData(uri, postData, headers) {
    console.log('>>>>>>> Request>>>>>> : ', postData);
    return new Promise((resolve, reject) => {
      axios
        .post(uri, postData, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'Content-Type': 'multipart/form-data',
            ...headers,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          console.log('[error 5]', { err });
          reject(handleErrorMessage(err));
        });
    });
  }

  static put(uri, updateData) {
    store.dispatch(setLoading(true));
    return new Promise((resolve, reject) =>
      axios
        .put(uri, updateData, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: REQUEST_TIMEOUT,
        })
        .then((response) => {
          console.log('responsePut', response);
          resolve(response);
          setTimeout(() => {
            store.dispatch(setLoading(false));
          }, 300);
        })
        .catch((err) => {
          console.log('err', err);

          // console.log('[error]', { err });
          reject(handleErrorMessage(err));
          setTimeout(() => {
            store.dispatch(setLoading(false));
          }, 300);
        })
    );
  }

  static getMultiple(listGetRequest) {
    return new Promise((resolve, reject) => {
      axios
        .all(listGetRequest)
        .then(
          axios.spread((...responses) => {
            resolve(responses);
          })
        )
        .catch((errors) => {
          reject(handleErrorMessage(errors));
        });
    });
  }

  static postUrlencoded = (uri, postData, headers) => {
    const config = {
      method: 'post',
      url: uri,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify(postData),
    };

    return new Promise((resolve, reject) => {
      axios(config)
        .then((response) => {
          console.log('postUrlencoded', response);
          resolve(response);
        })
        .catch((err) => {
          //  console.log('[error]', { err });
          console.log('errr 3', { err });
          reject(handleErrorMessage(err));
        });
    });
  };
}

export function* callApi(api, params) {
  return yield call(api, params);
}

export const objectToGetParams = (object) => {
  const params = Object.entries(object).map(
    ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
  );

  return params.length > 0 ? `?${params.join('&')}` : '';
};
