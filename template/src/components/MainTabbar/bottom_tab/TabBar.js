import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import StaticTabBar, {tabHeight as height} from './StaticTabBar';
import {CUSTOM_COLOR} from 'constants/colors';
import {scale} from 'utils/responsive';

const {width} = Dimensions.get('window');

const tabsLength = 5;

const tabWidth = width / tabsLength;

const TabBar = props => {
  return (
    <>
      <View {...{width, height}} style={styles.container}>
        <View style={styles.absoluteFill}>
          <StaticTabBar value={-width + tabWidth * 2} {...props} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CUSTOM_COLOR.White,
    borderTopRightRadius: scale(30),
    borderTopLeftRadius: scale(30),
    shadowColor: CUSTOM_COLOR.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFill,
    elevation: 5,
  },
});

export default React.memo(TabBar);
