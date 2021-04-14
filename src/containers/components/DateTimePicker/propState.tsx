import { AndroidNativeProps, IOSNativeProps } from '@react-native-community/datetimepicker';
import { StyleProp, ViewStyle } from 'react-native';

export interface IState {
  showModalDateTime: boolean;
  currentDate: Date;
}

type Native = IOSNativeProps & AndroidNativeProps;

export interface IProps extends Native {
  onChangeDate?: (selectDate: Date) => void;
  label?: string;
  /** main style */
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}
