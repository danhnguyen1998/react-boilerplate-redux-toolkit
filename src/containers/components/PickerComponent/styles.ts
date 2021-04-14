import {Colors} from '@src/styles/colors';
import {s, vs} from '@src/styles/scalingUtils';
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.greyOpacity,
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: Colors.white,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: s(15),
    borderTopRightRadius: s(15),
    borderColor: Colors.primaryColor,
    height: '50%',
  },
  modalHeder: {
    borderBottomWidth: 2,
    borderColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(10),
    paddingVertical: vs(15),
  },
  modalHeaderText: {
    fontFamily: 'Roboto-Bold',
    fontSize: s(16),
    color: Colors.primaryColor,
  },
  btnCancel: {
    fontFamily: 'Roboto-Medium',
    fontSize: s(13),
    color: Colors.red,
  },
  itemTouch: {
    borderBottomWidth: s(1),
    borderBottomColor: Colors.borderColor,
    paddingHorizontal: s(20),
    paddingVertical: s(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTex: {
    fontFamily: 'Roboto-Medium',
    fontSize: s(13),
    color: Colors.textColor,
  },
  touchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: s(1),
    height: s(40),
  },
  touchText: {
    fontFamily: 'Roboto-Medium',
    fontSize: s(14),
    color: Colors.textColor,
    textAlignVertical: 'center',
    marginLeft: Platform.OS == 'android' ? s(2) : 0,
  },
  groupView: {flex: 1},
});

export default styles;
