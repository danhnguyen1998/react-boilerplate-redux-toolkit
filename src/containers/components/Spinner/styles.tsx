import { Colors } from '@src/styles/colors';
import { ms, s, vs } from '@src/styles/scalingUtils';
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
    backgroundColor: 'rgba(0,0,0,0.25)',
    zIndex: 1,
  },
  viewContent: {
    backgroundColor: Colors.white,
    paddingLeft: s(15),
    paddingRight: s(13),
    paddingVertical: vs(15),
    borderRadius: ms(10),
    justifyContent: "center",
    alignItems: 'center',
  },
});
