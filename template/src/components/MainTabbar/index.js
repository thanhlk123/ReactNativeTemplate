/* eslint-disable prettier/prettier */
import { BOTTOM_TAB_HEIGHT, DEVICE_WIDTH } from 'constants/size';
import React from 'react';
import { View } from 'react-native';
import BottomTabBar from './bottom_tab/TabBar';

const TabBar = (props) => {
  const { state, descriptors, navigation } = props;

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return <View />;
  }

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={[
        {
          width: DEVICE_WIDTH,
          position: 'absolute',
          bottom: 0,
          justifyContent: 'flex-end',
        },
        {
          height: BOTTOM_TAB_HEIGHT,
        },
      ]}>
      <BottomTabBar {...{ focusedOptions, descriptors, navigation, state }} />
    </View>
  );
};

export default TabBar;
