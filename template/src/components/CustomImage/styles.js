import {CUSTOM_COLOR} from 'constants/colors';
import {StyleSheet} from 'react-native';
import {scale} from 'utils/responsive';

const styles = StyleSheet.create({
  defaultImage: isResize => ({
    width: isResize ? scale(50) : scale(24),
    height: isResize ? scale(50) : scale(24),
  }),
  defaultImageContainer: {
    backgroundColor: CUSTOM_COLOR.White,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 900,
  },
  bgGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.6,
    zIndex: 900,
  },
  overlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    // backgroundColor: CUSTOM_COLOR.Black,
    // opacity: 0.3,
    zIndex: 900,
  },
});

export default styles;
