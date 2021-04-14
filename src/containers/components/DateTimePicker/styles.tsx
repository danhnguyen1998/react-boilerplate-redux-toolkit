import { Colors } from '@src/styles/colors';
import { ms, s, vs } from '@src/styles/scalingUtils';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const TextInputTouchIconStyled = styled.Image`
  background-color: ${Colors.White};
  padding: ${vs(9)}px;
  width: ${s(14)}px;
  height: ${s(14)}px;
`;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.Alto,
    borderWidth: ms(1),
    borderRadius: s(4),
    backgroundColor: Colors.White,
    flexDirection: 'row',
    alignItems: 'center',
    height: s(32),
    paddingHorizontal:s(12),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: Colors.White,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: ms(10),
    borderTopRightRadius: ms(10),
  },
  modalHeder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(15),
    paddingTop: ms(15),
  },
  btnCancel: {
    fontFamily: 'Roboto-Bold',
    color: Colors.Pure_Orange,
  },
  btnSelect: {
    fontFamily: 'Roboto-Bold',
    color: Colors.San_Marino,
  },
});

export default styles;
