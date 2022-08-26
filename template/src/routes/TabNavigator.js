import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { CUSTOM_COLOR } from 'constants/colors';
import SCREENS_NAME from 'constants/screens';
import { StyleSheet, View, Text } from 'react-native';
import { add, interpolate } from 'react-native-reanimated';
import { scale } from 'utils/responsive';
import MainTabbar from 'components/MainTabbar';
import { IcHome, IcProfile } from 'assets/icons';
import AppText from 'components/AppText';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 2000,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress.interpolate({
      inputRange: [0, 0.5, 0.9, 1],
      outputRange: [0, 0.2, 0.7, 1],
    }),
  },
});

const forHeaderFade = ({ current, next }) => {
  const opacity = interpolate(add(current.progress, next ? next.progress : 0), {
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const DemoScreen = () => {
  return (
    <View style={styles.demScreenContainer}>
      <Text>Demo screen</Text>
    </View>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        transitionSpec: {
          open: config,
          close: config,
        },
        cardStyleInterpolator: forFade,
        headerStyleInterpolator: forHeaderFade,
      }}>
      <Stack.Screen
        name={SCREENS_NAME.HOME_SCREEN}
        component={DemoScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        transitionSpec: {
          open: config,
          close: config,
        },
        cardStyleInterpolator: forFade,
        headerStyleInterpolator: forHeaderFade,
      }}>
      <Stack.Screen
        name={SCREENS_NAME.PROFILE_SCREEN}
        component={DemoScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREENS_NAME.HOME_STACK}
      tabBar={(props) => <MainTabbar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={SCREENS_NAME.HOME_STACK}
        component={HomeStack}
        options={({ route }) => ({
          tabBarIcon: {
            active: (
              <View style={styles.activeIconWrapper}>
                <View style={styles.circleView} />
                <IcHome color={CUSTOM_COLOR.Black} />
                <AppText size="M" style={styles.titleActive}>
                  Trang chủ
                </AppText>
              </View>
            ),
            inactive: (
              <View style={styles.activeIconWrapper}>
                <View style={styles.circleViewInActive} />
                <IcHome color={CUSTOM_COLOR.Black} />
                <AppText size="M" style={[styles.titleActive, { color: CUSTOM_COLOR.SpunPearl }]}>
                  Trang chủ
                </AppText>
              </View>
            ),
          },
          key: 1,
        })}
      />

      <Tab.Screen
        name={SCREENS_NAME.PROFILE_STACK}
        component={ProfileStack}
        options={({ route }) => ({
          tabBarIcon: {
            active: (
              <View style={styles.activeIconWrapper}>
                <View style={styles.circleView} />
                <IcProfile color={CUSTOM_COLOR.Black} />
                <AppText size="M" style={styles.titleActive}>
                  Hồ sơ
                </AppText>
              </View>
            ),
            inactive: (
              <View style={styles.activeIconWrapper}>
                <View style={styles.circleViewInActive} />
                <IcProfile color={CUSTOM_COLOR.Black} />
                <AppText size="M" style={[styles.titleActive, { color: CUSTOM_COLOR.Black }]}>
                  Hồ sơ
                </AppText>
              </View>
            ),
          },
          key: 4,
        })}
      />
    </Tab.Navigator>
  );
};

export const AppStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardOverlayEnabled: true,
        transitionSpec: {
          open: config,
          close: config,
        },
        gestureEnabled: false,
        cardStyleInterpolator: forFade,
        headerStyleInterpolator: forHeaderFade,
      }}>
      <Stack.Screen
        name={SCREENS_NAME.MAIN_SCREEN}
        component={TabStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: scale(60),
  },
  header: {
    width: '100%',
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(48),
    backgroundColor: CUSTOM_COLOR.White,
  },
  titleActive: {
    color: CUSTOM_COLOR.LightSeaGreen,
    marginTop: scale(6),
  },
  circleView: {
    backgroundColor: CUSTOM_COLOR.LightSeaGreen,
    width: scale(4),
    height: scale(4),
    borderRadius: 50,
    marginVertical: scale(6),
  },
  circleViewInActive: {
    backgroundColor: 'transparent',
    width: scale(4),
    height: scale(4),
    marginVertical: scale(6),
  },
  demScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
