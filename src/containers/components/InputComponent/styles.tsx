import { Colors } from '@src/styles/colors';
import { s } from '@src/styles/scalingUtils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: s(15),
    flex: 1,
  },
  inputWrap: {
    borderColor: Colors.borderColor,
    borderWidth: s(1),
    borderRadius: s(5),
    backgroundColor: Colors.white,
    paddingHorizontal: s(13),
    flexDirection: 'row',
    height: s(40),
  },
  inputStyles: {
    fontFamily: 'Roboto-Regular',
    fontSize: s(13),
    flex: 1,
    color: Colors.textColor,
    height: s(40),
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
  iconLeftStyles: {
    height: s(38),
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center',
    marginRight: s(8)
  },
  leftIconStyle: {
    color: Colors.primaryColor,
  },
  iconRightStyles: {
    width: s(38),
    height: s(38),
    justifyContent: 'center',
  },
  rightIconStyle: {
    color: Colors.primaryColor,
  },
});

export default styles;
