import { Colors } from '@src/styles/colors';
import { s } from '@src/styles/scalingUtils';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

interface Props {
  data: object[],
  value: string | null,
  selectedValue?: string,
  selectedText?: string,
  onChange: (selected: any) => void;
  placeholder?: string;
  disabled?: boolean;
}

const defaultProps: Props = {
  data: [],
  value: "",
  selectedText: "text",
  selectedValue: "id",
  onChange: (selected: any) => { },
  placeholder: "",
  disabled: false
}

const PickerComponent = (props: Props = defaultProps) => {
  const [state, setState] = useState({
    showModal: false,
    data: [],
    textDisplay: ""
  })

  useEffect(() => {
    const newData = [...props.data];
    newData.unshift({
      [props.selectedValue || "id"]: "",
      [props.selectedText || "text"]: props.placeholder,
    })
    setState(state => ({ ...state, data: newData as any }));
  }, [props.data]);

  useEffect(() => {
    let textDisplay = "";
    if (state.data.length <= 0) {
      setState(state => ({ ...state, textDisplay: props.placeholder || "" }));
      return;
    }
    if (props.value !== "") {
      const obj: any = state.data.find((item: any) => item[props.selectedValue || "id"] == props.value);
      if (obj) {
        textDisplay = obj[props.selectedText || "text"];
      }
    } else {
      textDisplay = state.data[0][props.selectedText || "text"];
    }
    setState(state => ({ ...state, textDisplay }));
  }, [props.value]);

  const _toggleModal = () =>
    setState((state) => ({ ...state, showModal: !state.showModal }));

  const _onSelectedValue = (item: any) => () => {
    setState((state) => ({ ...state, showModal: !state.showModal }));
    if (props.onChange) props.onChange(item);
  }

  const _renderItem = ({ item, index }: any) => (
    <TouchableOpacity key={`select_${index}`} style={styles.itemTouch} onPress={_onSelectedValue(item)}>
      <Text style={[styles.itemTex, { color: index === 0 ? Colors.manatee : Colors.textColor }]}>
        {item[props.selectedText || "text"]}
      </Text>
      {item[props.selectedValue || "id"] == props.value ?
        <Icon name="checkmark-circle" size={s(20)} color={Colors.primaryColor} />
        : null}
    </TouchableOpacity>
  );

  const _keyExtractor = (_item: any, index: number) => index.toString();

  return (
    <>
      <View style={styles.groupView}>
        <TouchableOpacity onPress={_toggleModal} style={styles.touchView} disabled={props.disabled}>
          <Text style={[styles.touchText, { color: props.value ? Colors.textColor : Colors.manatee }]} numberOfLines={1}>{state.textDisplay}</Text>
          <Icon name="chevron-down-outline" size={s(20)} color={Colors.manatee} style={{ position: "absolute", right: 0, backgroundColor: Colors.white }} />
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={state.showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeder}>
              <Text style={styles.modalHeaderText}>{props.placeholder}</Text>
              <TouchableOpacity onPress={_toggleModal}>
                <Text style={styles.btnCancel}>Huỷ bỏ</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              keyExtractor={_keyExtractor}
              data={state.data}
              renderItem={_renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default React.memo(PickerComponent);