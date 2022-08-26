import AppText from 'components/AppText';
import StyledTouchable from 'components/StyledTouchable';
import {CUSTOM_COLOR} from 'constants/colors';
import {SUBJECT_TYPE} from 'constants/constants';
import {LINE_HEIGHT, SPACING} from 'constants/size';
import PropTypes from 'prop-types';
import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {translate as trans} from 'src/i18n';
import {scale} from 'utils/responsive';
import {typeSubjectList} from './config';

const SelectForm = props => {
  const {errors, touched, onConfirm, value, name} = props;
  const [open, setOpen] = React.useState(false);
  const onSelected = type => {
    if (typeof onConfirm === 'function') {
      if (type !== value) {
        onConfirm(type);
      }
      setOpen(prev => !prev);
    }
  };

  const onOpen = () => {
    setOpen(prev => !prev);
    Keyboard.dismiss();
  };
  return (
    <View style={styles.container}>
      <AppText style={styles.title} size="M" color={CUSTOM_COLOR.Gray}>
        {trans('contactUs.subject')}
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
          {typeSubjectList.find(subject => subject.value === value).name}
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
      {open && (
        <View style={styles.dropdownView}>
          {typeSubjectList.map((type, index) => (
            <View key={index.toString()}>
              <StyledTouchable onPress={() => onSelected(type.value)}>
                <AppText
                  size="M"
                  color={CUSTOM_COLOR.Zambezi}
                  style={styles.text}>
                  {type.name}
                </AppText>
              </StyledTouchable>
              {typeSubjectList.length - 1 !== index && (
                <View style={styles.line} />
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

SelectForm.propTypes = {
  errors: PropTypes.any,
  touched: PropTypes.any,
  onConfirm: PropTypes.func,
  value: PropTypes.any,
  name: PropTypes.string,
};

SelectForm.defaultProps = {
  value: SUBJECT_TYPE.APP,
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(12),
    zIndex: 1111,
  },
  input: {
    height: scale(40),
    marginTop: scale(12),
    borderBottomWidth: 1,
    padding: scale(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: CUSTOM_COLOR.SuvaGrey,
  },
  errorText: {
    justifyContent: 'flex-start',
    lineHeight: LINE_HEIGHT.SubHead,
  },
  dropdownView: {
    backgroundColor: CUSTOM_COLOR.White,
    borderRadius: scale(8),
    width: '99.5%',
    position: 'absolute',
    right: 1,
    bottom: scale(-90),
    shadowColor: CUSTOM_COLOR.Black,
    shadowOffset: {
      width: 0,
      height: 0.65,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: CUSTOM_COLOR.WhiteSmoke,
  },
  text: {padding: SPACING.XNormal},
});

export default React.memo(SelectForm);
