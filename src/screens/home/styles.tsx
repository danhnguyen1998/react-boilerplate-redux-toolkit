import { Colors } from '@src/styles/colors';
import { s } from '@src/styles/scalingUtils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerCenter: {
    fontFamily: 'Roboto-Bold',
    fontSize: s(18),
    color: Colors.white,
  },
  bottomNavigation: {
    height: s(63),
    borderStyle: 'solid',
    paddingLeft: s(5),
  },
  fullTabLabelStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: s(13),
    color: Colors.manatee,
  },
  text_right: {
    textAlign: 'right',
  },
  text_center: {
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'column',
    // paddingHorizontal: s(15),
    paddingTop: s(10)
  },
  itemTitle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: s(5),
    paddingHorizontal: s(10),
  },
  itemTitleText: {
    fontFamily: 'Roboto-Bold',
    fontSize: s(14),
    color: Colors.primaryColor,
    flex: 1,
    flexWrap: 'wrap',
  },
  itemSubTitleText: {
    fontFamily: 'Roboto',
    fontSize: s(12),
    color: Colors.primaryColor,
    flex: 1,
    flexWrap: 'wrap',
    paddingTop:s(5)
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: "space-between",
    paddingHorizontal: s(10),
  },
  itemRowColumnFirst: {
    flexDirection: 'column',
  },
  itemRowColumn: {
    flexDirection: 'column',
  },
  itemRowHeader: {
    fontFamily: 'Roboto-Medium',
    fontSize: s(13),
    paddingVertical: s(5),
  },
  itemRowDetail: {
    fontFamily: 'Roboto-Regular',
    fontSize: s(11),
    color: Colors.manatee,
  },
  divider: {
    backgroundColor: Colors.borderColor,
    height: s(1),
    marginTop: s(10),
  },
  groupButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: s(15),
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderTopColor: Colors.borderColor

  },
  btnTouch: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    fontFamily: 'Roboto-Regular',
    fontSize: s(16),
    color: Colors.manatee
  },
  emptyView: {
    flex: 1, alignItems: "center", marginTop: s(40)
  },
  emptyText:{ fontSize: 15, fontFamily: "Roboto-Medium", color: Colors.primaryColor }
});

export default styles;
