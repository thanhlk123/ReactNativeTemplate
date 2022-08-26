import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import setting from './settings';

const settingPersistConfig = {
  key: 'setting',
  storage: AsyncStorage,
  whitelist: ['lang'],
  version: 1.0,
};

export default combineReducers({
  setting: persistReducer(settingPersistConfig, setting),
});
