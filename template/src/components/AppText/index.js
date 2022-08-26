import withStyle from 'components/HOC/withStyle';
import { CUSTOM_COLOR } from 'constants/colors';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { translate as trans } from 'src/i18n';
import { scale } from 'utils/responsive';

const SIZES = {
  VS: 10,
  S: 12,
  M: 14,
  L: 16,
  XL: 18,
  XXL: 20,
  XXXL: 24,
  XXXXL: 28,
};

const selectText = createSelector(
  (state) => state.setting.lang,
  (_, children) => children,
  (_, children) => {
    return trans(children);
  }
);

const fontsize = (size) => {
  if (size) {
    return SIZES[size];
  }
  return SIZES.M;
};

const AppText = ({
  children,
  style,
  translate = false,
  bold,
  semibold,
  medium,
  size,
  color,
  uppercase,
  lowercase,
  ...props
}) => {
  const lang = useSelector((state) => selectText(state, children));

  const styleContainer = useMemo(() => {
    const defaultStyle = {
      // fontFamily: FONT_FAMILY.REGULAR,
      fontSize: scale(fontsize('M')),
    };

    let fontSizeStyle = { fontSize: scale(fontsize(size)) };

    // const fontStyle = bold
    //   ? FONT_FAMILY.BOLD
    //   : semibold
    //   ? FONT_FAMILY.SEMIBOLD
    //   : medium
    //   ? FONT_FAMILY.MEDIUM
    //   : FONT_FAMILY.REGULAR;

    const styleF = () => {
      const result = {};
      if (uppercase) {
        return { ...result, textTransform: 'uppercase' };
      }
      if (lowercase) {
        return { ...result, textTransform: 'lowercase' };
      }
      return result;
    };

    return [
      defaultStyle,
      fontSizeStyle,
      styleF(),
      {
        // fontFamily: fontStyle,
        color: color || CUSTOM_COLOR.White,
      },
      style,
    ];
  }, [size, bold, semibold, medium, color, style, uppercase, lowercase]);

  return (
    <Text {...props} style={styleContainer} allowFontScaling={false}>
      {translate ? lang + '' : children}
    </Text>
  );
};

AppText.defaultProps = {
  style: PropTypes.any,
  translate: false,
  children: PropTypes.any,
  color: CUSTOM_COLOR.Primary,
  size: 'L',
};

AppText.propTypes = {
  style: PropTypes.any,
  translate: PropTypes.bool,
  children: PropTypes.any,
  color: PropTypes.any,
  size: PropTypes.oneOf(['VS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL']),
};

export default withStyle(AppText);
