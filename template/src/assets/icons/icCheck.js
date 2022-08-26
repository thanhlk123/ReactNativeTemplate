import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {CUSTOM_COLOR} from 'constants/colors';

const SvgComponent = props => {
  const {color = CUSTOM_COLOR.Malachite} = props;
  return (
    <Svg
      width={23}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.44 2.04 20.4 0 8.368 12.032 2.04 5.702 0 7.743 8.157 15.9l.212-.211.21.21L22.44 2.04Z"
        fill={color}
      />
    </Svg>
  );
};

const Memo = memo(SvgComponent);
export default Memo;
