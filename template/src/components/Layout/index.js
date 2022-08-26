import React, { useState, useLayoutEffect, useCallback } from 'react';
import { View, StyleSheet, NativeModules, Platform, SafeAreaView, StatusBar } from 'react-native';
import { CUSTOM_COLOR } from 'constants/colors';
import PropTypes from 'prop-types';
import { getBottomSpace } from 'utils/responsive';
import { PLATFORM } from 'constants/constants';

const { StatusBarManager } = NativeModules;

const Layout = ({
  children,
  type,
  style,
  backgroundColor,
  onPressModal,
  onCancelModal,
  nonePadding,
  noneBottom,
  isBackgroundTransparent,
  isLightStatusBar,
}) => {
  const [heightStatus, setHeightStatus] = useState(0);

  useLayoutEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((statusBarHeight) => {
        setHeightStatus(statusBarHeight.height);
      });
    } else {
      setHeightStatus(StatusBarManager.HEIGHT);
    }
  }, []);

  const renderStatusBarView = useCallback(
    () => (
      <StatusBar
        barStyle={isLightStatusBar ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor={
          PLATFORM.IOS ? 'transparent' : isBackgroundTransparent ? 'transparent' : 'white'
        }
      />
    ),
    [isBackgroundTransparent, isLightStatusBar]
  );

  if (type === 'view') {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor || CUSTOM_COLOR.White,
            paddingTop: !nonePadding ? heightStatus : 0,
            paddingBottom: noneBottom ? 0 : getBottomSpace(),
          },
          style,
        ]}>
        {renderStatusBarView()}
        {children}
      </View>
    );
  }
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor || CUSTOM_COLOR.White }, style]}>
      {renderStatusBarView()}
      {children}
    </SafeAreaView>
  );
};

Layout.defaultProps = {
  children: PropTypes.any,
  type: 'area',
  style: {},
  backgroundColor: CUSTOM_COLOR.White,
  loading: false,
  onPressModal: () => {},
  onCancelModal: () => {},
  nonePadding: false,
};

Layout.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  style: PropTypes.object,
  backgroundColor: PropTypes.string,
  loading: PropTypes.bool,
  onPressModal: PropTypes.func,
  onCancelModal: PropTypes.func,
  nonePadding: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default React.memo(Layout);
