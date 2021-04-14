import { Colors } from '@src/styles/colors';
import { ms } from '@src/styles/scalingUtils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: ms(15),
    height: ms(40),
    borderWidth: ms(1),
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.primaryColor,
    borderRadius: ms(5),
    flex: 1,
  },
  btnContainer: {
    justifyContent: 'center',
    height: ms(38),
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'Roboto-Bold',
    color: 'white',
  },
});

export default styles;
