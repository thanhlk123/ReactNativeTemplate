import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = () => {
  const set = async (key, value) => {
    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (e) {}
  };
  const get = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch (e) {
      return '';
    }
  };

  return { set, get };
};

const LocalStorage = storage();

export default LocalStorage;
