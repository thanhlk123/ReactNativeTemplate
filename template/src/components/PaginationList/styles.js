import {FONT_FAMILY} from 'constants/appFonts';
import {FONT_SIZE, SPACING} from 'constants/size';
import {StyleSheet} from 'react-native';
import {scale} from 'utils/responsive';

const styles = StyleSheet.create({
  loading: {padding: SPACING.XNormal, alignItems: 'center'},
  pd_8: {
    padding: SPACING.Normal,
  },
  container: {},
  emptyContainer: {},
  imgEmpty: {
    width: scale(180),
    height: scale(140),
  },
  titleEmpty: {
    fontSize: FONT_SIZE.regular,
    fontFamily: FONT_FAMILY.SEMIBOLD,
    textAlign: 'center',
    lineHeight: scale(24),
  },
});

export default styles;
