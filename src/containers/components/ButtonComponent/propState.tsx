import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface IProps {
  styleContainer?: StyleProp<ViewStyle>;
  styleButton?: ViewStyle;
  styleText?: StyleProp<TextStyle>;
  onPress: (event: GestureResponderEvent) => void;
  text: string;
  disabled?: boolean;
}
