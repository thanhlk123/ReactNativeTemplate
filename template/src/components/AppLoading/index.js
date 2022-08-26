import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {CUSTOM_COLOR} from 'constants/colors';
import Modal from 'react-native-modal';

const AppLoading = ({loading}) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={CUSTOM_COLOR.White} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.Black,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(AppLoading);
