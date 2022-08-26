import { flattenDeep } from 'lodash';
import React, { useMemo } from 'react';
import { scale } from 'utils/responsive';

export default function withStyle(WrapperComponent) {
  return React.forwardRef((props, ref) => {
    const styleContainer = useMemo(() => {
      const arrRest = Object.keys(props);
      const styleObj = arrRest.reduce((prev, key) => {
        //   margin
        if (key.indexOf('mt-') === 0) {
          const num = scale(Number(key.split('mt-')[1]));
          return { ...prev, marginTop: num };
        }
        if (key.indexOf('mb-') === 0) {
          const num = scale(Number(key.split('mb-')[1]));
          return { ...prev, marginBottom: num };
        }
        if (key.indexOf('mx-') === 0) {
          const num = scale(Number(key.split('mx-')[1]));
          return { ...prev, marginHorizontal: num };
        }
        if (key.indexOf('my-') === 0) {
          const num = scale(Number(key.split('my-')[1]));
          return { ...prev, marginVertical: num };
        }
        // padding

        if (key.indexOf('pt-') === 0) {
          const num = scale(Number(key.split('pt-')[1]));
          return { ...prev, paddingTop: num };
        }
        if (key.indexOf('pb-') === 0) {
          const num = scale(Number(key.split('pb')[1]));
          return { ...prev, paddingBottom: num };
        }
        if (key.indexOf('px-') === 0) {
          const num = scale(Number(key.split('px')[1]));
          return { ...prev, paddingHorizontal: num };
        }
        if (key.indexOf('py-') === 0) {
          const num = scale(Number(key.split('py')[1]));
          return { ...prev, paddingVertical: num };
        }

        switch (key) {
          case 'center':
            return { ...prev, justifyContent: 'center' };
          case 'middle':
            return { ...prev, alignItems: 'center' };
          default:
            break;
        }

        return prev;
      }, {});
      const result = flattenDeep([styleObj, props?.style]);
      return result;
    }, [props]);
    return <WrapperComponent ref={ref} {...props} style={styleContainer} />;
  });
}
