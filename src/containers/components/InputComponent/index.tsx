import { Colors } from '@src/styles/colors';
import { ms, s } from '@src/styles/scalingUtils';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { IProps } from './propState';
import styles from './styles';

export const InputComponent = React.forwardRef((props: IProps, ref: React.LegacyRef<TextInput>) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.label && <Text style={props.labelStyle}>{props.label}</Text>}
      <View style={[styles.inputWrap, props.inputWrapStyle]}>
        {props.leftIcon && (
          <TouchableOpacity onPress={props.leftIconOnPress}>
            <Icon
              containerStyle={styles.iconLeftStyles}
              type="font-awesome-5"
              name={props.leftIcon}
              size={ms(16)}
              solid={true}
              iconStyle={{ ...styles.leftIconStyle, ...props.leftIconStyle }}
            />
          </TouchableOpacity>
        )}
        <TextInput
          ref={ref}
          placeholderTextColor={props.placeholderTextColor || Colors.borderColor}
          style={[styles.inputStyles, props.inputStyle]}
          {...props}
        />
        {props.rightIcon && typeof props.rightIcon === 'string' && (
          <TouchableOpacity onPress={props.rightIconOnPress}>
            <Icon
              containerStyle={styles.iconRightStyles}
              type="font-awesome-5"
              name={props.rightIcon}
              size={ms(16)}
              solid={true}
              iconStyle={{ ...styles.rightIconStyle, ...props.rightIconStyle }}
            />
          </TouchableOpacity>
        )}
        {props.rightIcon && typeof props.rightIcon !== 'string' && props.rightIcon}
      </View>
      {props.error && <Text style={{
        fontFamily: 'Roboto-Regular',
        fontSize: s(10),
        fontStyle: "italic",
        marginLeft: s(12),
        marginTop: s(5),
        color: Colors.red
      }}>{props.error}</Text>}
    </View>
  );
});
