import { changeLanguage } from 'actions/settings';
import { checkNumber } from 'utils/formatNumber';
import Memoize from 'lodash/memoize';
import moment from 'moment';
import 'moment/min/locales';
import { store } from 'store';
import en from './locales/en';
import vi from './locales/vi';

const I18n = require('i18n-js').I18n;

const i18n = new I18n({
  vi,
  en,
});

i18n.defaultLocale = 'vi';
i18n.locale = 'vi';

const translationGetters = {
  vi,
  en,
};
const regexCheckExist = /^(?=.*\bmissing\b)(?=.*\btranslation\b).*$/g;

export const translate = Memoize(
  (key, config) => {
    try {
      if (Array.isArray(key)) {
        const arr = [...key].filter((ob) => {
          if ((ob + '').trim()) {
            return ob;
          }
        });

        const newArr = arr.map((ob) => {
          if (checkNumber(ob)) {
            return ob;
          }

          const trans = i18n.t(ob, config);

          if (!trans.match(regexCheckExist)) {
            return trans;
          }

          return ob;
        });

        return newArr.join(' ');
      }

      const textTranslate = i18n.t(key, config);

      if (textTranslate.match(regexCheckExist) || typeof textTranslate === 'object') {
        return key;
      }

      return i18n.t(key, config);
    } catch (error) {
      return key;
    }
  },
  (textTranslate, config) => {
    try {
      return config ? textTranslate + JSON.stringify(config) : textTranslate;
    } catch (error) {
      return textTranslate;
    }
  }
);

export const setI18nConfig = async (lang = '') => {
  const fallback = { languageTag: lang || 'vi' };
  const { languageTag } = fallback;
  i18n.locale = languageTag;
  i18n.translations = {
    [languageTag]: translationGetters[languageTag],
  };
  moment.locale(i18n.locale);
  translate.cache.clear();
};

// Get current app language
export const initLanguge = () => {
  const lang = store.getState()?.setting?.lang || '';

  if (lang) {
    setI18nConfig(lang);
  } else {
    const languageCode = 'vi';
    store.dispatch(changeLanguage(languageCode));
    setI18nConfig(languageCode);
  }
};

export default i18n;
