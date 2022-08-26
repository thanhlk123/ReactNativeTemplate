import React from 'react';
import { CUSTOM_COLOR } from 'constants/colors';
import { StyleSheet, View } from 'react-native';

const Divider = ({ color, height, width, style }) => {
  const styleLine = [
    styles.line,
    style,
    color ? { backgroundColor: color } : {},
    height ? { height } : {},
    width ? { width } : {},
  ];
  return <View style={styleLine} />;
};

export default Divider;

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: CUSTOM_COLOR.Alto,
  },
});
