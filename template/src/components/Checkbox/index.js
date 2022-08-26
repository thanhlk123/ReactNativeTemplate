import { IcCheck } from 'assets/icons';
import StyledTouchable from 'components/StyledTouchable';
import { CUSTOM_COLOR } from 'constants/colors';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';

const CheckBox = (props) => {
  const { isChecked, onPress, disabled } = props;
  return (
    <StyledTouchable disabled={disabled} onPress={onPress} style={styles.checkBox}>
      <IcCheck color={isChecked ? CUSTOM_COLOR.Malachite : CUSTOM_COLOR.White} />
    </StyledTouchable>
  );
};

CheckBox.defaultProps = {
  isChecked: false,
  onPress: () => {},
};

CheckBox.propTypes = {
  isChecked: PropTypes.bool,
  onPress: PropTypes.func,
};

export default React.memo(CheckBox);
