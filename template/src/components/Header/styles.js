import {CUSTOM_COLOR} from 'constants/colors';
import {DEVICE_WIDTH, SPACING} from 'constants/size';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.Medium,
    justifyContent: 'space-between',
  },
  iconLeft: {
    padding: SPACING.Normal,
    margin: -SPACING.Normal,
  },
  title: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  padding_8: {
    padding: SPACING.Normal,
    margin: -SPACING.Normal,
  },
  titleView: {
    position: 'absolute',
    zIndex: -1,
    top: SPACING.Medium,
    width: DEVICE_WIDTH,
    right: 0,
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: CUSTOM_COLOR.Gallery,
  },
});
