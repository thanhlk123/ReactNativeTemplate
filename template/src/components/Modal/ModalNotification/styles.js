import { CUSTOM_COLOR } from 'constants/colors';
import { StyleSheet } from 'react-native';
import { scale } from 'utils/responsive';

const styles = StyleSheet.create({
  container: {
    backgroundColor: CUSTOM_COLOR.White,
    width: scale(310),
    paddingHorizontal: scale(19),
    borderRadius: scale(16),
    alignItems: 'center',
    paddingVertical: scale(40),
  },
  containerModal: {
    alignSelf: 'center',
  },
  iconImage: {
    marginBottom: scale(10),
    width: scale(102),
    height: scale(102),
  },
  viewSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewMessage: {
    marginTop: scale(8),
  },
  title: {
    fontSize: scale(20),
  },
  note: {
    fontSize: scale(16),
    textAlign: 'center',
    color: CUSTOM_COLOR.WildBlueYonder,
  },
  buttonStyle: {
    borderRadius: scale(24),
    height: scale(48),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  viewMultipleButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scale(30),
  },
  buttonActiveStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(12),
    width: scale(120),
    backgroundColor: CUSTOM_COLOR.Primary,
    paddingVertical: scale(19),
  },
  buttonCancelActiveStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(7),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.Primary,
    width: scale(120),
    marginRight: scale(15),
    paddingVertical: scale(19),
  },
  titleActive: {},
  titleCancelActive: {},
});

export default styles;
