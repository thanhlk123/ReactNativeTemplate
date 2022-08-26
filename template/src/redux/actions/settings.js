import { SETTINGS } from 'actionsType';

export const changeLanguage = (lang) => {
  return {
    type: SETTINGS.CHANGE_LANGUAGE.HANDLER,
    lang,
  };
};

export const setLoading = (lang) => {
  return {
    type: SETTINGS.SET_LOADING.HANDLER,
    lang,
  };
};
