import { ms } from '@src/styles/scalingUtils';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  view_loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    zIndex: 2,
  },
  viewContent: {
    backgroundColor: '#FFFFFF',
    padding: ms(20),
    borderRadius: 10,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: ms(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
