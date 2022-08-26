import React, {useRef, useCallback, useState} from 'react';
import {View, TextInput} from 'react-native';
import {CUSTOM_COLOR} from 'constants/colors';
import {CustomTouchable, AppText} from '..';
import styles from './styles';
import {IcDeleteInput} from 'assets/icons';
import {removeEmoji} from 'helpers/string';

const Input = props => {
  const {
    refInput,
    multiline,
    title,
    translate = false,
    translateTitle = false,
    translatePlaceholder = false,
    placeholderTxt,
    placeholder,
    value,
    upperCase,
    onChangeText,
    editable,
    autoCapitalize = 'none',
    keyboardType,
    item,
    maxLength,
    noBorder = false,
    hasExtend,
    borderBottomColor,
    errorText,
    titleColor,
    onClearValue,
    isDelete,
    containerStyle,
    style,
    sizeButtonDelete = 16,
    onPress,
    ...rest
  } = props;

  const inputRef = useRef({
    isFocus: false,
    isValidated: false,
    hasValue: false,
  });

  const [isFocus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    if (typeof onPress === 'function') {
      onPress();
    } else {
      setFocus(true);
      inputRef.current.isFocus = true;
    }
  }, [onPress]);

  const onBlur = useCallback(() => {
    setFocus(false);
    inputRef.current.isFocus = false;
  }, []);

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          {!!title && (
            <View style={styles.row}>
              <AppText
                color={titleColor || CUSTOM_COLOR.Gray}
                translate={translateTitle || translate}
                style={[styles.title]}>
                {title}
              </AppText>
            </View>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={refInput}
            blurOnSubmit={false}
            placeholder={
              translatePlaceholder || translate ? placeholderTxt : placeholder
            }
            value={value}
            onChangeText={text =>
              onChangeText(
                upperCase ? removeEmoji(text.toUpperCase()) : removeEmoji(text),
              )
            }
            style={[styles.inputContainer, style]}
            placeholderTextColor={CUSTOM_COLOR.Silver}
            onFocus={onFocus}
            onBlur={onBlur}
            editable={editable}
            autoCorrect={false}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType || 'default'}
            maxLength={maxLength}
            {...rest}
          />
          {isDelete && !!value && (
            <CustomTouchable style={styles.iconDelete} onPress={onClearValue}>
              <IcDeleteInput
                width={sizeButtonDelete}
                height={sizeButtonDelete}
              />
            </CustomTouchable>
          )}
        </View>
        {!noBorder && (
          <View
            style={{
              backgroundColor: errorText
                ? CUSTOM_COLOR.BrightRed
                : isFocus
                ? CUSTOM_COLOR.Gray
                : CUSTOM_COLOR.Alto,
              ...styles.divider,
            }}
          />
        )}
        {errorText && (
          <AppText color={CUSTOM_COLOR.BrightRed}>{errorText}</AppText>
        )}
      </View>
    </>
  );
};

export default React.memo(Input);
