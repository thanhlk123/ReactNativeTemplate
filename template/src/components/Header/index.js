import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {AppText, StyledTouchable} from '..';
import {CUSTOM_COLOR} from 'constants/colors';
import {IcLeft} from 'assets/icons';
import styles from './styles';
import {scale} from 'utils/responsive';

const defaultFunction = () => {};

const Header = ({
  title,
  onPressLeft,
  onPressRight,
  onPressNextRight,
  onPressNextLeft,
  icRight,
  icNextRight,
  icNextLeft,
  icLeft,
  isShowIcLeft,
  customStyle,
  goBack,
  isLine = false,
  titleColor,
  titleStyle,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={[styles.container, customStyle]}>
        <View style={styles.row}>
          {isShowIcLeft && (
            <StyledTouchable
              style={styles.iconLeft}
              onPress={goBack ? () => navigation.goBack() : onPressLeft}>
              {icLeft ? (
                icLeft
              ) : (
                <IcLeft width={scale(24)} height={scale(24)} />
              )}
            </StyledTouchable>
          )}
          {!!icNextLeft && (
            <StyledTouchable onPress={onPressNextLeft}>
              {icNextLeft}
            </StyledTouchable>
          )}
        </View>
        <View style={styles.titleView}>
          <AppText
            numberOfLines={1}
            size="L"
            color={titleColor || CUSTOM_COLOR.MineShaft}
            translate
            medium
            style={[styles.title, titleStyle]}>
            {title || ''}
          </AppText>
        </View>
        <View style={[styles.row]}>
          {!!icNextRight && (
            <StyledTouchable
              style={styles.padding_8}
              onPress={onPressNextRight}>
              {icNextRight}
            </StyledTouchable>
          )}
          {!!icRight && (
            <StyledTouchable style={styles.padding_8} onPress={onPressRight}>
              {icRight}
            </StyledTouchable>
          )}
        </View>
      </View>
      {isLine && <View style={styles.line} />}
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  onPressNextRight: PropTypes.func,
  onPressNextLeftL: PropTypes.func,
  icRight: PropTypes.any,
  icNextRight: PropTypes.any,
  icNextLeft: PropTypes.any,
  icLeft: PropTypes.any,
  isShowIcLeft: PropTypes.bool,
  customStyle: PropTypes.object,
  titleColor: PropTypes.string,
};

Header.defaultProps = {
  title: '',
  onPressLeft: defaultFunction,
  onPressRight: defaultFunction,
  onPressNextRight: defaultFunction,
  onPressNextLeftL: defaultFunction,
  isShowIcLeft: true,
};

export default Header;
