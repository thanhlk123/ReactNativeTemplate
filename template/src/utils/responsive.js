import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scaleW = (size) => (width / guidelineBaseWidth) * size;
const scaleH = (size) => (height / guidelineBaseHeight) * size;
const fontScale = (size, factor = 0.5) => size + (scaleW(size) - size) * factor;

const scale = (size) => Math.floor((width / guidelineBaseWidth) * size);

function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}

function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}

export { scaleW, scaleH, fontScale, scale, isIphoneX, getBottomSpace };
