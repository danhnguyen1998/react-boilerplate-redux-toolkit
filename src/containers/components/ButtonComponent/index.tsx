import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IProps } from './propState';
import styles from './styles';

export default function ButtonComponent(props: IProps) {
  return (
    <View style={[styles.mainContainer, props.styleContainer]}>
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.btnContainer, {opacity: props.disabled ? 0.5 : 1}, props.styleButton]}
        disabled={props.disabled}>
        <Text style={[styles.btnText,props.styleText]}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}
