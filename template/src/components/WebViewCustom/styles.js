import {CUSTOM_COLOR} from 'constants/colors';
import {DEVICE_WIDTH, FONT_SIZE, SPACING} from 'constants/size';
import {StyleSheet} from 'react-native';
import {scale} from 'utils/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.Medium,
    borderBottomWidth: 1,
    borderBottomColor: CUSTOM_COLOR.Gainsboro,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    marginLeft: SPACING.Medium,
    paddingVertical: SPACING.Fit,
    width: '63%',
  },
  headerTitle: {
    marginBottom: SPACING.Tiny,
    fontSize: FONT_SIZE.default,
    marginLeft: SPACING.Small,
  },
  headerUrl: {
    color: CUSTOM_COLOR.Gray,
    marginLeft: SPACING.Small,
    width: '80%',
  },
  containerModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalItem: {
    marginBottom: SPACING.Tiny,
    fontSize: FONT_SIZE.regular,
    color: CUSTOM_COLOR.Black,
  },
  modalHeader: {
    marginBottom: SPACING.Tiny,
    fontSize: FONT_SIZE.large,
    color: CUSTOM_COLOR.White,
  },
  modalWrapper: {
    backgroundColor: CUSTOM_COLOR.White,
    width: DEVICE_WIDTH,
    height: scale(200),
    borderTopEndRadius: SPACING.Normal,
    borderTopStartRadius: SPACING.Normal,
  },
  openInBrowser: {
    fontSize: FONT_SIZE.small,
  },
});

export default styles;
