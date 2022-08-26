import {SETTINGS} from 'actionsType';

const initState = {
  lang: 'vi',
  isLoading: false,
};

const settingReducer = (state = initState, action) => {
  switch (action.type) {
    case SETTINGS.CHANGE_LANGUAGE.HANDLER:
      return {...state, lang: action.lang};
    case SETTINGS.SET_LOADING.HANDLER:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default settingReducer;
