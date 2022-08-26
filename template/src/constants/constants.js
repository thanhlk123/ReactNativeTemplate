import { Platform } from 'react-native';

export const PLATFORM = {
  IOS: Platform.OS === 'ios',
  ANDROID: Platform.OS === 'android',
};
