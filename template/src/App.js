import React, {useEffect} from 'react';
import {Text, SafeAreaView, StyleSheet, LogBox} from 'react-native';
import {RootSiblingParent} from 'react-native-root-siblings';
import {PersistGate} from 'redux-persist/integration/react';
import storeConfig from './redux/store';
import {CUSTOM_COLOR} from './constants/colors';
import {initLanguge} from './i18n';
import RootNavigator from './routes/RootNavigator';
import {ModalNotification} from 'components/Modal';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const App = () => {
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested',
    "exported from 'deprecated-react-native-prop-types'.",
    'Remote debugger',
  ]);
  useEffect(() => {
    initLanguge();
  }, []);

  return (
    <RootSiblingParent>
      <PersistGate loading={null} persistor={storeConfig.persistor}>
        <RootNavigator />
      </PersistGate>
      <ModalNotification />
      <SafeAreaView style={styles.bg_white} />
    </RootSiblingParent>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: CUSTOM_COLOR.Black},
  bg_white: {backgroundColor: CUSTOM_COLOR.White},
});
export default App;
