import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { AppText } from '..';
import { emptyList } from 'assets/images';
import { CUSTOM_COLOR } from 'constants/colors';
import { scale } from 'utils/responsive';

const EmptyContent = ({
  title,
  containerStyle,
  translate = false,
  imageStyle,
  titleStyle,
  img,
  color = CUSTOM_COLOR.SuvaGrey,
  isFetching = false,
}) => {
  return (
    <View style={[styles.container(isFetching), containerStyle]}>
      <Image source={img || emptyList} style={[styles.img, imageStyle]} />
      <AppText translate={translate} color={color} bold size="L" style={[styles.title, titleStyle]}>
        {title || 'Không có dữ liệu'}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (isFetching) => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: isFetching ? 'none' : 'flex',
    marginTop: scale(144),
  }),
  title: {
    width: '100%',
    textAlign: 'center',
  },
  img: {
    width: scale(333),
    height: scale(236),
  },
});

export default React.memo(EmptyContent);
