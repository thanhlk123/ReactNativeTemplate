import { throttle } from 'lodash';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const configThrottle = { trailing: false };
const onPressDefault = () => null;

const StyledTouchable = (props, ref) => {
  const {
    disabled,
    children,
    style,
    throttleTime = 1000,
    onPress = onPressDefault,
    activeOpacity = 0.8,
    ...args
  } = props;

  const handlePress = throttle(onPress, throttleTime, configThrottle);

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={style}
      ref={ref}
      onPress={handlePress}
      {...args}>
      {children}
    </TouchableOpacity>
  );
};

export default React.forwardRef(StyledTouchable);
