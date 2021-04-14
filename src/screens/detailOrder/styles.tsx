import {Colors} from '@src/styles/colors';
import {s} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listDetailContainer: {
    paddingVertical: s(10),
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: s(1),
    paddingHorizontal: s(10),
  },
  listDetailTen: {
    color: Colors.primaryColor,
  },
  listDetailView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: s(5),
    justifyContent: 'space-between',
  },
  listDetailQuantity: {
    fontFamily: 'Roboto-Regular',
    fontSize: s(13),
  },
  lisDetailAmount: {
    fontFamily: 'Roboto-Bold',
    fontSize: s(13),
    color: Colors.dark,
    textAlign:"right"
  },
  viewGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewText: {
    width: '30%',
    fontFamily: 'Roboto-Regular',
    fontSize: s(13),
    color: Colors.textColor,
    paddingVertical: s(5),
  },
  viewInputText: {
    fontFamily: 'Roboto-Medium',
    fontSize: s(14),
    color: Colors.textColor,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: s(1),
    flex: 1,
    paddingVertical: s(11),
  },
  groupView: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: s(10),
  },
  groupViewName: {
    fontFamily: 'Roboto-Bold',
    fontSize: s(15),
    color: Colors.primaryColor,
    marginVertical: s(10),
  },
  groupViewContent: {
    fontFamily: 'Roboto-Medium',
    fontSize: s(13),
    color: Colors.manatee,
    marginBottom: s(10),
  },
  groupViewHeader: {
    flex: 1,
    padding: s(10),
    backgroundColor: Colors.primaryColor05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupViewHeaderText: {
    fontFamily: 'Roboto-Bold',
    fontSize: s(14),
    color: Colors.primaryColor,
  },
  groupViewDetail: {
    flex: 1,
    paddingHorizontal: s(10),
    paddingBottom: s(10),
  },
  groupViewAmount: {
    flex: 1,
    padding: s(10),
    backgroundColor: Colors.primaryColor05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupViewSub: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  groupViewTextLeft: {
    fontFamily: 'Roboto-Regular',
    fontSize: s(13),
    color: Colors.textColor,
  },
  groupViewTextRight: {
    fontFamily: 'Roboto-Bold',
    fontSize: s(14),
    color: Colors.red,
  },
  checkboxContainer:{
    backgroundColor: Colors.white,
    borderWidth: 0,
    padding: 0,
    margin:0,
    justifyContent: 'center',
  }
});

export default styles;
