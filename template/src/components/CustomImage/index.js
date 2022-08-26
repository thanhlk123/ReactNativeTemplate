import {bgGradient, defaultImage} from 'assets/images';
import {checkImageURL} from 'utils/helpers';
import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale} from 'utils/responsive';
import styles from './styles';
import {LinearGradient} from 'react-native-linear-gradient';

const CustomImage = ({
  isBgGradient = false,
  isOverlay = false,
  heightOverlay,
  ...args
}) => {
  const [isErrorLoadUrl, setErrorLoadUrl] = useState(false);
  const [isImageDefaultBeforeLoad, setImageDefaultBeforeLoad] = useState(true);

  const onError = () => {
    setErrorLoadUrl(true);
  };
  const onLoadEnd = () => {
    setImageDefaultBeforeLoad(false);
  };

  useEffect(() => {
    if (isEmpty(args?.source?.uri)) {
      setErrorLoadUrl(true);
      return;
    }
    checkImageURL(args?.source?.uri, isValid => {
      setErrorLoadUrl(!isValid);
    });
  }, [args?.source?.uri]);

  return (
    <View>
      {(isErrorLoadUrl || isImageDefaultBeforeLoad) && (
        <View {...args?.style} style={styles.defaultImageContainer}>
          <FastImage
            source={defaultImage}
            style={styles.defaultImage(args?.style?.height > scale(64))}
          />
        </View>
      )}
      <FastImage onLoadEnd={onLoadEnd} onError={onError} fallback {...args} />
      {isBgGradient && !isErrorLoadUrl && (
        <FastImage source={bgGradient} style={styles.bgGradient} />
      )}
      {isOverlay && (
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={[styles.overlay, {height: heightOverlay}]}
        />
      )}
    </View>
  );
};

export default React.memo(CustomImage);
