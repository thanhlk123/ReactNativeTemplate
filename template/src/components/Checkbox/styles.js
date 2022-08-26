import {CUSTOM_COLOR} from 'constants/colors';
import {StyleSheet} from 'react-native';
import {scale} from 'utils/responsive';

const styles = StyleSheet.create({
  checkBox: {
    width: scale(27),
    height: scale(27),
    borderRadius: scale(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: CUSTOM_COLOR.Alto,
    borderWidth: 1.5,
    backgroundColor: CUSTOM_COLOR.White,
  },
});

export default styles;
