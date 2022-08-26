import { Dimensions, Platform, StatusBar } from 'react-native';
import { fontScale, scaleH, scaleW } from 'utils/responsive';

export const statusBarHeight = StatusBar.currentHeight;
export const screenHeight = Dimensions.get('screen').height;
export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;
export const navbarHeight = screenHeight - windowHeight - statusBarHeight;
export const MAIN_HEADER_HEIGHT = scaleH(50);
export const SIZE_TOGGLE_CONTENT_BOTTOM = scaleH(60);
export const HEIGHT_BUTTON_BOTTOM = scaleH(50);
export const TAB_MENU_HEIGHT = scaleH(60);

export const STATUS_BAR_HEIGHT = statusBarHeight;

export const BOTTOM_BAR_HEIGHT = Platform.OS === 'ios' ? scaleH(15) : scaleH(10);

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const HEADER_HEIGHT = STATUS_BAR_HEIGHT + scaleH(44);
export const BOTTOM_TAB_HEIGHT = BOTTOM_BAR_HEIGHT + scaleH(55);

export const FONT_SIZE = {
  big: fontScale(22),
  extraLarge: fontScale(20),
  large: fontScale(18),
  regular: fontScale(16),
  default: fontScale(14),
  small: fontScale(12),
  tiny: fontScale(10),
};

export const SPACING = {
  Tiny: scaleW(2),
  Small: scaleW(4),
  XSmall: scaleW(6),
  Normal: scaleW(8),
  Fit: scaleW(10),
  XNormal: scaleW(12),
  XXNormal: scaleW(14),
  Medium: scaleW(16),
  XMedium: scaleW(20),
  Large: scaleW(24),
  XLarge: scaleW(26),
  XXLarge: scaleW(32),
  HasBottomButton: BOTTOM_TAB_HEIGHT + scaleH(52),
  BottomButton: scaleW(16),
  HtmlBottom: scaleW(40),
  BottomInputForm: scaleW(300),
};

export const LINE_HEIGHT = {
  BoldTitle: scaleH(50),
  Title1: scaleH(42),
  Title2: scaleH(34),
  Title3: scaleH(26),
  Heading: scaleH(19),
  BodyText: scaleH(17),
  SubHead: scaleH(22),
  Small: scaleH(14),
  Tiny: scaleH(12),
};
