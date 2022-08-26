import {IcAlertCircle} from 'assets/icons';
import AppText from 'components/AppText';
import {CUSTOM_COLOR} from 'constants/colors';
import {SPACING} from 'constants/size';
import React, {useRef, useCallback, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import Modal from 'react-native-modal';
import {scale} from 'utils/responsive';

const NoteTooltip = ({content, containerStyle, buttonStyle, style}) => {
  const btnRef = useRef(null);
  const [isVisible, setVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState(undefined);
  const [contentHeight, setContentHeight] = useState(0);

  const renderModal = useCallback(
    () => (
      <Modal
        isVisible={isVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0}
        style={styles.container}
        onBackdropPress={() => setVisible(false)}>
        <View
          onLayout={e => setContentHeight(e.nativeEvent.layout.height)}
          style={[
            styles.content,
            containerStyle,
            !!dropdownPosition && {
              top: dropdownPosition - contentHeight,
            },
          ]}>
          <AppText
            translate
            style={styles.txtContent}
            color={CUSTOM_COLOR.White}>
            {content}
          </AppText>
        </View>
      </Modal>
    ),
    [isVisible, content, dropdownPosition, containerStyle, contentHeight],
  );

  const onToggleModal = useCallback(async () => {
    Keyboard.dismiss();
    if (!isVisible) {
      const [, y, , h] = await new Promise(resolve =>
        btnRef.current.measureInWindow((...args) => resolve(args)),
      );
      setDropdownPosition(y - h - scale(12));
    }

    setVisible(!isVisible);
  }, [isVisible]);

  return (
    <View style={style}>
      <TouchableOpacity
        style={[styles.btn, buttonStyle]}
        ref={btnRef}
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
        onPress={onToggleModal}>
        <IcAlertCircle />
      </TouchableOpacity>
      {!!content && renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  btn: {},
  content: {
    position: 'absolute',
    backgroundColor: CUSTOM_COLOR.Mako,
    paddingHorizontal: SPACING.Medium,
    paddingVertical: SPACING.Normal,
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
    borderBottomLeftRadius: scale(8),
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});

export default React.memo(NoteTooltip);
