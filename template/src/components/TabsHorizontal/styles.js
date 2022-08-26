import {StyleSheet} from 'react-native';
import {DEVICE_WIDTH, SPACING} from 'constants/size';
import {FONT_SIZE} from 'constants/appFonts';
import {CUSTOM_COLOR} from 'constants/colors';
import {scale} from 'utils/responsive';

const styles = StyleSheet.create({
  tabsHeader: {
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: CUSTOM_COLOR.Gray,
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: CUSTOM_COLOR.FreeSpeechRed,
    flexDirection: 'row',
  },
  tabItemTitle: {
    fontSize: FONT_SIZE.small,
  },
  tabItemTotal: {
    fontSize: FONT_SIZE.small,
  },
  tabsContent: {
    flex: 1,
  },
});

export default styles;
