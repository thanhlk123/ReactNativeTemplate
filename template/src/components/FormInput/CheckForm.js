import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import PropsTypes from 'prop-types';
import {IcChecked, IcUnCheck} from 'assets/icons';
import AppText from 'components/AppText';
import StyledTouchable from 'components/StyledTouchable';
import {CUSTOM_COLOR} from 'constants/colors';
import {SPACING} from 'constants/size';

const CheckForm = ({
  containerStyle,
  title,
  value,
  name,
  onChange,
  translate,
  icChecked,
  icUnCheck,
  titleStyle,
  colorTitle,
}) => {
  const [checked, setChecked] = useState(value);

  const onPress = useCallback(() => {
    setChecked(prev => !prev);
    onChange(!checked);
  }, [onChange, checked]);
  useEffect(() => {
    setChecked(value);
  }, [value]);
  return (
    <View style={[styles.container, containerStyle]}>
      <StyledTouchable onPress={onPress}>
        {checked ? icChecked : icUnCheck}
      </StyledTouchable>
      <AppText
        translate={translate}
        style={[styles.title, titleStyle]}
        color={colorTitle}>
        {title}
      </AppText>
    </View>
  );
};

CheckForm.propTypes = {
  containerStyle: PropsTypes.object,
  title: PropsTypes.string,
  value: PropsTypes.bool,
  name: PropsTypes.string,
  onchange: PropsTypes.func,
  icChecked: PropsTypes.element,
  icUnCheck: PropsTypes.element,
  transtale: PropsTypes.bool,
  titleStyle: PropsTypes.object,
  colorTitle: PropsTypes.string,
};

CheckForm.defaultProps = {
  value: false,
  onChange: () => {},
  title: '',
  name: '',
  translate: false,
  icChecked: <IcChecked />,
  icUnCheck: <IcUnCheck />,
  colorTitle: CUSTOM_COLOR.Zambezi,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingLeft: SPACING.Normal,
    paddingVertical: SPACING.Normal,
  },
});

export default React.memo(CheckForm);
