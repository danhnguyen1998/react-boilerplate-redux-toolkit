import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { Colors } from '@src/styles/colors';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Modal, Platform, StyleProp, Text, TextStyle, TouchableOpacity, View } from 'react-native';
import { IProps, IState } from './propState';
import styles, { TextInputTouchIconStyled } from './styles';

export const DateTimePickerComponent = (props: IProps) => {
  const [state, setState] = useState<IState>({
    showModalDateTime: false,
    currentDate: props.value,
  });

  useEffect(() => {
    setState((state) => ({ ...state, currentDate: props.value }));
  }, [props.value]);

  const colorText: StyleProp<TextStyle> = { color: !props.value ? Colors.Black : Colors.Gray };

  const _toggleModalDateTime = () =>
    setState((state) => ({
      ...state,
      showModalDateTime: !state.showModalDateTime,
      currentDate: props.value,
    }));

  const _onChange = (_event: Event, selectedDate?: Date) => {
    if (selectedDate) {
      setState((state) => ({
        ...state,
        currentDate: selectedDate,
        showModalDateTime: Platform.OS === 'android' ? false : true,
      }));
      if (Platform.OS === 'android') {
        if (props.onChangeDate) props.onChangeDate(selectedDate);
      }
    }
  };

  const _chooseDate = () => {
    if (props.onChangeDate) props.onChangeDate(state.currentDate);
    _toggleModalDateTime();
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.container, props.containerStyle]}
        onPress={_toggleModalDateTime}
        disabled={props.disabled}>
        <Text style={[colorText, { flex: 1 }]}>{moment(state.currentDate).format('DD/MM/YYYY') || props.label}</Text>
        <TextInputTouchIconStyled source={require('@src/assets/images/Date.png')} />
      </TouchableOpacity>
      {Platform.OS === 'ios' ? (
        <Modal animationType="fade" transparent={true} visible={state.showModalDateTime}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeder}>
                <TouchableOpacity onPress={_toggleModalDateTime}>
                  <Text style={styles.btnCancel}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_chooseDate}>
                  <Text style={styles.btnSelect}>Select</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker {...props} display="spinner" value={state.currentDate} onChange={_onChange} />
            </View>
          </View>
        </Modal>
      ) : null}
      {Platform.OS === 'android'
        ? state.showModalDateTime && <DateTimePicker {...props} value={state.currentDate} onChange={_onChange} />
        : null}
    </>
  );
};
