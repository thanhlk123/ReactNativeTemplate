import React from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {scale} from 'utils/responsive';
import {CUSTOM_COLOR} from 'constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import ModalDatePicker from 'components/Modal/ModalDatePicker';
import moment from 'moment';
import AppText from 'components/AppText';
import StyledTouchable from 'components/StyledTouchable';
import {LINE_HEIGHT} from 'constants/size';

const optionsDefault = {
  title: '--/--/----',
};

const DateForm = props => {
  const {
    title,
    placeholder,
    errors,
    touched,
    onConfirm,
    value,
    name,
    setCloseDate,
  } = props;
  const [open, setOpen] = React.useState(false);

  const onOpen = () => {
    Keyboard.dismiss();
    setOpen(true);
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title} size="M" color={CUSTOM_COLOR.Gray}>
        {title}
      </AppText>
      <StyledTouchable
        style={[
          styles.input,
          {
            borderColor:
              errors[name] && touched[name]
                ? CUSTOM_COLOR.BrightRed
                : CUSTOM_COLOR.Alto,
          },
        ]}
        onPress={onOpen}>
        <AppText color={CUSTOM_COLOR.Zambezi}>
          {value ? moment(value).format('DD-MMM-YYYY') : placeholder}
        </AppText>
        <Icon name="caretdown" size={scale(14)} color={CUSTOM_COLOR.Zambezi} />
      </StyledTouchable>
      {touched[name] && errors[name] ? (
        <AppText
          size="S"
          color={CUSTOM_COLOR.BrightRed}
          style={styles.errorText}>
          {errors[name]}
        </AppText>
      ) : null}
      <ModalDatePicker
        value={value}
        onConfirm={isDate => onConfirm(isDate)}
        isVisible={open}
        handleCancel={() => {
          setOpen(false);
          setCloseDate();
        }}
      />
    </View>
  );
};

DateForm.propTypes = {
  inputStyle: PropTypes.object,
  title: PropTypes.string,
  errors: PropTypes.any,
  touched: PropTypes.any,
  onConfirm: PropTypes.func,
  value: PropTypes.any,
  name: PropTypes.string,
};

DateForm.defaultProps = {
  title: optionsDefault.title,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: scale(12),
  },
  input: {
    height: scale(40),
    marginTop: scale(12),
    borderBottomWidth: 1,
    paddingVertical: scale(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: CUSTOM_COLOR.SuvaGrey,
  },
  errorText: {
    justifyContent: 'flex-start',
    // color: TEXT_COLOR.Flamingo,
    // fontSize: FONT_SIZE.SubHead,
    lineHeight: LINE_HEIGHT.SubHead,
    // fontFamily: FONT_FAMILY.REGULAR,
  },
});

export default React.memo(DateForm);
