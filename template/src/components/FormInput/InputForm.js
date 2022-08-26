import React, {useRef, useCallback, useState} from 'react';
import {View, TextInput, StyleSheet, Platform} from 'react-native';
import {SPACING, LINE_HEIGHT, FONT_SIZE} from 'constants/size';
import {CUSTOM_COLOR} from 'constants/colors';
import {scale} from 'utils/responsive';
import {CustomTouchable, AppText} from '..';
import {IcDeleteInput} from 'assets/icons';
import {formatPhoneNumber} from 'helpers/formatNumber';
import {removeEmoji} from 'helpers/string';
import {FONT_FAMILY, FONT_SIZE as APP_FONT_SIZE} from 'constants/appFonts';
import NoteTooltip from './NoteTooltip';

const InputForm = props => {
  const {
    type,
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
    errors,
    titleColor,
    onClearValue,
    isDelete,
    containerStyle,
    style,
    handleBlur,
    name,
    touched,
    typeInput,
    limit = 2000,
    note = false,
    prefix,
    onOutFocused,
    ...rest
  } = props;

  const inputRef = useRef({
    isFocus: false,
    isValidated: false,
    hasValue: false,
  });

  const [isFocus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
    inputRef.current.isFocus = true;
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
    inputRef.current.isFocus = false;
    handleBlur(name);
    if (typeof onOutFocused === 'function') {
      onOutFocused();
    }
  }, [handleBlur, name, onOutFocused]);

  const onChange = useCallback(
    text => {
      if (
        (prefix && typeInput === 'phone') ||
        (prefix && typeInput === 'number')
      ) {
        const phoneFormat = formatPhoneNumber(text);
        let content = '';
        if (phoneFormat) {
          content = prefix + phoneFormat;
        } else {
          content = phoneFormat;
        }
        onChangeText(name)(removeEmoji(content));
      } else if (typeInput === 'phone' || typeInput === 'number') {
        const phoneFormat = formatPhoneNumber(text);
        onChangeText(name)(removeEmoji(phoneFormat));
      } else {
        onChangeText(name)(removeEmoji(text));
      }
    },
    [prefix, onChangeText, name, typeInput],
  );

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          {!!title && (
            <View style={styles.row}>
              <AppText
                color={titleColor || CUSTOM_COLOR.Gray}
                translate={translateTitle || translate}
                style={[
                  styles.title,
                  type === 'textarea' && {paddingBottom: 0},
                ]}>
                {title}
              </AppText>
            </View>
          )}
          {note && <NoteTooltip content={note} />}
        </View>
        <View style={type === 'textarea' ? {} : styles.inputWrapper}>
          {type === 'textarea' ? (
            <>
              <AppText color={CUSTOM_COLOR.Silver} style={styles.length}>
                {value.trim().length}/{limit}
              </AppText>
              <TextInput
                ref={refInput}
                blurOnSubmit={false}
                placeholder={
                  translatePlaceholder || translate
                    ? placeholderTxt
                    : placeholder
                }
                value={value}
                onChangeText={text => onChangeText(name)(removeEmoji(text))}
                style={[
                  styles.inputMultiContainer,
                  style,
                  {
                    borderColor:
                      errors[name] && touched[name]
                        ? CUSTOM_COLOR.BrightRed
                        : isFocus
                        ? CUSTOM_COLOR.Gray
                        : CUSTOM_COLOR.Alto,
                  },
                ]}
                placeholderTextColor={CUSTOM_COLOR.Silver}
                onFocus={onFocus}
                onBlur={onBlur}
                editable={editable}
                autoCorrect={false}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType || 'default'}
                maxLength={maxLength}
                multiline={true}
                {...rest}
              />
            </>
          ) : (
            <View style={styles.viewInput}>
              <TextInput
                ref={refInput}
                blurOnSubmit={false}
                placeholder={
                  translatePlaceholder || translate
                    ? placeholderTxt
                    : placeholder
                }
                value={value}
                onChangeText={onChange}
                style={[
                  styles.inputContainer,
                  style,
                  !value && styles.placeholderStyle,
                ]}
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
            </View>
          )}
          {isFocus && isDelete && value?.trim()?.length > 0 && (
            <CustomTouchable style={styles.iconDelete} onPress={onClearValue}>
              <IcDeleteInput />
            </CustomTouchable>
          )}
        </View>

        {!noBorder && type !== 'textarea' && (
          <View
            style={{
              backgroundColor:
                errors[name] && touched[name]
                  ? CUSTOM_COLOR.BrightRed
                  : isFocus
                  ? CUSTOM_COLOR.Gray
                  : CUSTOM_COLOR.Alto,
              ...styles.divider,
            }}
          />
        )}

        {touched[name] && errors[name] ? (
          <AppText
            size="S"
            color={CUSTOM_COLOR.BrightRed}
            style={styles.errorText}>
            {errors[name]}
          </AppText>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    marginTop: SPACING.Medium,
  },
  inputContainer: {
    flex: 1,
    color: CUSTOM_COLOR.MineShaft,
    maxHeight: scale(22),
    fontSize: APP_FONT_SIZE.small,
    paddingLeft: 0,
    paddingVertical: 0,
    marginVertical: 0,
    textAlignVertical: 'center',
    fontWeight: '500',
  },
  inputMultiContainer: {
    fontSize: FONT_SIZE.default,
    color: CUSTOM_COLOR.MineShaft,
    borderWidth: 1,
    padding: scale(12),
    height: scale(142),
    textAlignVertical: Platform.select({android: 'top', ios: undefined}),
  },
  title: {
    lineHeight: LINE_HEIGHT.SubHead,
    paddingBottom: SPACING.Normal,
  },
  divider: {
    marginTop: scale(8),
    height: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    color: CUSTOM_COLOR.RegentGray,
  },
  errorText: {
    justifyContent: 'flex-start',
    lineHeight: LINE_HEIGHT.SubHead,
  },
  errorTextWrapper: {
    marginTop: scale(2),
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputExtend: {
    marginBottom: SPACING.Normal,
  },
  inputView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: CUSTOM_COLOR.White,
  },
  textareaMark: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  maxLength: {
    lineHeight: LINE_HEIGHT.SubHead,
    textAlign: 'right',
  },
  radioBox: {
    paddingRight: SPACING.Medium,
  },
  radioBoxesContainer: {},
  iconDelete: {
    padding: scale(8),
    margin: -scale(8),
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  length: {
    marginBottom: SPACING.Small,
    flex: 1,
    alignSelf: 'flex-end',
    fontSize: FONT_SIZE.small,
  },
  noteText: {
    fontStyle: 'italic',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderStyle: {
    fontWeight: '400',
    lineHeight: scale(22),
  },
});

export default React.memo(InputForm);
