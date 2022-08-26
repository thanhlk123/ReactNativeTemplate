import { StyleSheet } from 'react-native';
import { scale } from 'utils/responsive';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(8),
    paddingVertical: scale(12),
  },
});

export default styles;
