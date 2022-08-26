import {StyleSheet} from 'react-native';
import {SPACING, LINE_HEIGHT, FONT_SIZE} from 'constants/size';
import {CUSTOM_COLOR} from 'constants/colors';
import {scale} from 'utils/responsive';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    marginTop: SPACING.Medium,
  },
  inputContainer: {
    color: CUSTOM_COLOR.MineShaft,
    minHeight: LINE_HEIGHT.Heading,
    fontSize: FONT_SIZE.default,
    fontWeight: '500',
    paddingLeft: 0,
    paddingVertical: 0,
    marginVertical: 0,
    textAlignVertical: 'center',
    padding: 0,
    flex: 1,
  },
  dateInput: {
    color: CUSTOM_COLOR.GreenPea,
    paddingLeft: 0,
    paddingVertical: 0,
    marginVertical: 0,
    textAlignVertical: 'center',
  },
  title: {
    marginBottom: scale(8),
    lineHeight: LINE_HEIGHT.SubHead,
    paddingBottom: SPACING.Normal,
  },
  divider: {
    marginTop: scale(11),
    height: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comboBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: LINE_HEIGHT.BodyText,
  },
  textComboBox: {
    color: CUSTOM_COLOR.GreenPea,
    lineHeight: LINE_HEIGHT.BodyText,
    paddingLeft: 0,
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
    backgroundColor: '#fff',
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
  iconDelete: {
    marginLeft: scale(5),
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
