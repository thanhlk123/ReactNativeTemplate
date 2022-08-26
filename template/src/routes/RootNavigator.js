import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Indicator from 'components/CircleIndicator';
import AppLoading from 'components/AppLoading';
import { CUSTOM_COLOR } from 'constants/colors';
import SCREENS_NAME from 'constants/screens';
import navigationActions from 'utils/navigationActions';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { AppStackScreen } from './TabNavigator';
const RootStack = createStackNavigator();

const RootStackScreen = (props) => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={SCREENS_NAME.APP_STACK} component={AppStackScreen} />
    </RootStack.Navigator>
  );
};

const RootNavigator = (props) => {
  const isLoading = false;

  return (
    <NavigationContainer ref={navigationActions.setNavigator} onStateChange={async (state) => {}}>
      <Suspense
        fallback={
          <View style={styles.fallback}>
            <Indicator />
          </View>
        }>
        <>
          <SafeAreaProvider>
            <RootStackScreen {...props} />
          </SafeAreaProvider>
          {isLoading && <AppLoading loading={isLoading} />}
        </>
      </Suspense>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  safeAreaView: {
    backgroundColor: CUSTOM_COLOR.White,
    flex: 0,
  },
});

export default RootNavigator;
