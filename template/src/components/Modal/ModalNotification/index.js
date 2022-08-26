import { icSuccess, icError, icWarning } from 'assets/images';
import AppText from 'components/AppText';
import StyledTouchable from 'components/StyledTouchable';
import { CUSTOM_COLOR } from 'constants/colors';
import React, { useCallback, useEffect, useState } from 'react';
import { DeviceEventEmitter, Image, View } from 'react-native';
import Modal from 'react-native-modal';
import { scale } from 'utils/responsive';
import styles from './styles';

const MODAL = 'MODAL_NOTIFICATION';

const optionsDefault = {
  title: 'popup.title',
  message: '',
  hasCancel: false,
  hasConfirm: true,
  textCancel: 'popup.no',
  textConfirm: 'popup.yes',
  image: icSuccess,
  onPressCancel: () => {},
  onPressConfirm: () => {},
};

const ModalNotification = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState(optionsDefault);

  const onPressCancel = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      options?.onPressCancel();
    }, 300);
  }, [options]);

  const onPressConfirm = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      options?.onPressConfirm();
    }, 300);
  }, [options]);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(MODAL, (isShow, _options) => {
      if (isShow) {
        setTimeout(() => {
          setOptions({ ...optionsDefault, ..._options });
          setIsVisible(true);
        }, 30);
      } else {
        setIsVisible(false);
      }
    });

    return () => {
      listener.remove();
    };
  }, [options]);

  return (
    <Modal isVisible={isVisible} backdropTransitionOutTiming={0} style={styles.containerModal}>
      <View style={styles.container}>
        <Image source={options.image} resizeMode="contain" style={styles.iconImage} />
        {!!options.title && (
          <View style={[styles.viewSection, styles.viewTitle]}>
            <AppText bold translate style={styles.title}>
              {options.title}
            </AppText>
          </View>
        )}
        <View style={[styles.viewSection, styles.viewMessage]}>
          <AppText translate style={[styles.note]}>
            {options.message}
          </AppText>
        </View>
        <View style={styles.viewMultipleButton}>
          {options.hasCancel && (
            <StyledTouchable onPress={onPressCancel} style={styles.buttonCancelActiveStyle}>
              <AppText translate bold style={styles.titleCancelActive}>
                {options.textCancel}
              </AppText>
            </StyledTouchable>
          )}
          {options.hasConfirm && (
            <StyledTouchable
              onPress={onPressConfirm}
              style={[styles.buttonActiveStyle, !options.hasCancel && { width: scale(237) }]}>
              <AppText color={CUSTOM_COLOR.White} translate bold style={styles.titleActive}>
                {options.textConfirm}
              </AppText>
            </StyledTouchable>
          )}
        </View>
      </View>
    </Modal>
  );
});

const convertOptions = (actions = [], preOption = {}) => {
  const defaultFunction = () => {};
  return actions.reduce((a, b, index) => {
    if (index === 0) {
      return {
        ...a,
        hasConfirm: true,
        textConfirm: b.text,
        onPressConfirm: b.onPress || defaultFunction,
      };
    } else if (index === 1) {
      return {
        ...a,
        hasCancel: true,
        textCancel: b.text,
        onPressCancel: b.onPress || defaultFunction,
      };
    }
    return a;
  }, preOption);
};

export const showNotification = (options = optionsDefault) => {
  DeviceEventEmitter.emit(MODAL, true, options);
};

ModalNotification.show = showNotification;

ModalNotification.showConfirm = function (title, message, actions = [], options = {}) {
  let newOptions = convertOptions(actions, options);

  showNotification({
    title,
    message,
    hasConfirm: true,
    hasCancel: false,
    textConfirm: 'popup.close',
    image: icSuccess, //change your icon here
    ...newOptions,
  });
};

ModalNotification.showSuccess = (title, message, actions = [], options = {}) => {
  let newOptions = convertOptions(actions, options);

  showNotification({
    title,
    message,
    hasConfirm: true,
    hasCancel: false,
    textConfirm: 'popup.close',
    image: icSuccess,
    ...newOptions,
  });
};

ModalNotification.showWarning = (title, message, actions = [], options = {}) => {
  let newOptions = convertOptions(actions, options);

  showNotification({
    title,
    message,
    hasConfirm: true,
    hasCancel: false,
    textConfirm: 'popup.close',
    image: icWarning,
    ...newOptions,
  });
};

ModalNotification.showError = (title, message, actions = [], options = {}) => {
  let newOptions = convertOptions(actions, options);

  showNotification({
    title,
    message,
    isError: true,
    hasConfirm: true,
    hasCancel: false,
    textConfirm: 'popup.close',
    image: icError,
    ...newOptions,
  });
};

export default ModalNotification;
