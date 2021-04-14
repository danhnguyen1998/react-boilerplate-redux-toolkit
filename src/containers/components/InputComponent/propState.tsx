import { GestureResponderEvent, StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export interface IProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputWrapStyle?: ViewStyle;

  label?: string;
  labelStyle?: StyleProp<TextStyle>;

  /** left icon */
  leftIcon?: string;
  leftIconStyle?: TextStyle;
  leftIconOnPress?: (event: GestureResponderEvent) => void;

  /** right icon */
  rightIcon?: string | JSX.Element;
  rightIconStyle?: TextStyle;
  rightIconOnPress?: (event: GestureResponderEvent) => void;

  /** error message */
  error?: string;
}

