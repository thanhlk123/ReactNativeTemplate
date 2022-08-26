import {CUSTOM_COLOR} from 'constants/colors';
import {Formik} from 'formik';
import React, {useImperativeHandle, useMemo, useRef} from 'react';
import {Keyboard, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckForm from './CheckForm';
import DateForm from './DateForm';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

const Form = React.forwardRef((props, ref) => {
  const {
    initialValues,
    onSubmit,
    validationSchema,
    genValues,
    body,
    currentValue,
    onChange,
    view,
    customInputStyle,
  } = props;
  const refs = useRef([]);

  const Container = useMemo(
    () => (view ? view : KeyboardAwareScrollView),
    [view],
  );

  return (
    <Formik
      initialValues={initialValues}
      innerRef={ref}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({
        values,
        handleChange,
        setFieldValue,
        setFieldTouched,
        errors,
        touched,
        dirty,
        handleSubmit,
        handleBlur,
        setFieldError,
        handleReset,
      }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useImperativeHandle(ref, () => ({
          ...ref.current,
          reset: handleReset,
          dirty,
        }));
        currentValue && currentValue(values);
        return (
          <Container
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            // KeyboardAwareScrollView props
            scrollIndicatorInsets={{right: 1}}
            extraHeight={250}>
            {genValues.map((item, index) => {
              if (item.type === 'input' || item.type === 'textarea') {
                return (
                  <InputForm
                    refInput={element => {
                      const isExist = refs?.current?.find(e => e === element);

                      if (
                        element !== null &&
                        element !== undefined &&
                        !isExist
                      ) {
                        refs.current.push(element);
                      }
                    }}
                    key={item.name}
                    name={item.name}
                    title={item.title}
                    placeholder={item.placeholder}
                    style={[styles.input, customInputStyle]}
                    prefix={item?.prefix}
                    maxLength={item?.maxLength}
                    value={values[item.name]}
                    onChangeText={name => text => {
                      handleChange(name)(text);
                      typeof onChange === 'function' && onChange(name, text);
                    }}
                    isDelete={item.isDelete}
                    type={item.type}
                    numberOfLines={3}
                    typeInput={item.typeInput}
                    note={item.note}
                    keyboardType={
                      item.typeInput === 'phone'
                        ? 'number-pad'
                        : item.typeInput === 'number'
                        ? 'number-pad'
                        : 'default'
                    }
                    selectionColor={CUSTOM_COLOR.MineShaft}
                    onClearValue={() => setFieldValue(item.name, '')}
                    onSubmitEditing={() => {
                      if (refs?.current?.length === index + 1) {
                        Keyboard.dismiss();
                      }
                      refs?.current[index + 1] &&
                        refs?.current[index + 1]?.focus?.();
                    }}
                    onOutFocused={() => {
                      if (item?.isOutFocused) {
                        setFieldTouched(item.name, true);
                      }
                      if (item?.isTrim) {
                        setFieldValue(item.name, values[item.name]?.trim());
                      }
                    }}
                    {...{handleBlur, errors, touched}}
                  />
                );
              }
              if (item.type === 'date') {
                return (
                  <DateForm
                    key={item.name}
                    title={item.title}
                    placeholder={item.placeholder}
                    name={item.name}
                    value={values[item.name]}
                    onConfirm={value => setFieldValue(item.name, value)}
                    setCloseDate={() => {
                      if (!values[item.name]) {
                        setFieldTouched(item.name, true);
                      }
                    }}
                    {...{handleBlur, errors, touched}}
                  />
                );
              }
              if (item.type === 'select') {
                return (
                  <SelectForm
                    key={item.name}
                    title={item.title}
                    name={item.name}
                    value={values[item.name]}
                    onConfirm={value => setFieldValue(item.name, value)}
                    {...{handleBlur, errors, touched}}
                  />
                );
              }
              if (item.type === 'checkbox') {
                return (
                  <CheckForm
                    key={item.name}
                    title={item.title}
                    value={values[item.name]}
                    onChange={value => {
                      typeof onChange === 'function' &&
                        onChange(item.name, value);
                      setFieldValue(item.name, value);
                    }}
                    {...{handleBlur, errors, touched}}
                  />
                );
              }
            })}
            {body && body(handleSubmit, errors)}
          </Container>
        );
      }}
    </Formik>
  );
});

const styles = StyleSheet.create({});

export default React.memo(Form);
