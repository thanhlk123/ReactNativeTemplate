import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { CUSTOM_COLOR } from 'constants/colors';
import { AppText } from '..';
import styles from './styles';

const Button = (props) => {
  const {
    style,
    title,
    color,
    colorText,
    onPress,
    boldTitle = false,
    numberOfLines,
    adjustsFontSizeToFit,
    disabled,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        ...styles.container,
        ...style,
        backgroundColor: color,
      }}
      disabled={disabled}
      onPress={onPress}>
      <AppText
        size="L"
        translate
        color={colorText || CUSTOM_COLOR.White}
        bold={boldTitle}
        numberOfLines={numberOfLines}
        adjustsFontSizeToFit={adjustsFontSizeToFit}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  style: {},
  title: '',
  color: CUSTOM_COLOR.Black,
  colorText: CUSTOM_COLOR.White,
  onPress: () => {},
  numberOfLines: undefined,
  adjustsFontSizeToFit: false,
  disabled: false,
};

Button.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string,
  color: PropTypes.string,
  colorText: PropTypes.string,
  onPress: PropTypes.func,
  numberOfLines: PropTypes.number,
  adjustsFontSizeToFit: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default React.memo(Button);
