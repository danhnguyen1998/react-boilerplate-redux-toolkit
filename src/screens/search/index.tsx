import { useAppSelector } from "@src/boot/configureStore";
import ButtonComponent from '@src/containers/components/ButtonComponent';
import { InputComponent } from '@src/containers/components/InputComponent';
import { Colors } from "@src/styles/colors";
import { s } from '@src/styles/scalingUtils';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { Props } from './propState';
import { setSearchOrder } from './redux/slice';
import styles from './styles';

interface IFormInputs {
  tel: string;
  ten_kh: string;
  so_ct: string;
}

const SearchComponent = (props: Props) => {
  const dispatch = useDispatch();

  const searchState = useAppSelector(state => state.searchState);

  const { control, handleSubmit, setValue } = useForm<IFormInputs>({
    defaultValues: {
      tel: "",
      ten_kh: "",
      so_ct: ""
    }
  });

  useEffect(() => {
    setValue("tel", searchState.tel);
    setValue("ten_kh", searchState.ten_kh);
    setValue("so_ct", searchState.so_ct);
  }, []);

  const onSubmit = async (data: IFormInputs) => {
    try {
      await dispatch(setSearchOrder({
        tel: data.tel,
        ten_kh: data.ten_kh,
        so_ct: data.so_ct
      }));
      props.navigation.goBack();
    } catch (error) {
      Alert.alert("Lỗi", error.message);
    }
  }

  const clearSearch = async () => {
    try {
      await dispatch(setSearchOrder({ tel: "", ten_kh: "", so_ct: "" }));
      props.navigation.goBack();
    } catch (error) {
      Alert.alert("Lỗi", error.message);
    }
  }

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <View style={{ padding: s(20) }}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <InputComponent
              leftIcon="phone"
              autoCapitalize="none"
              placeholder="Số điện thoại"
              maxLength={100}
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="tel"
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <InputComponent
              leftIcon="user"
              placeholder="Tên khách hàng"
              maxLength={100}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="ten_kh"
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <InputComponent
              leftIcon="list-ol"
              placeholder="Số chứng từ"
              maxLength={100}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="so_ct"
        />
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <ButtonComponent
            styleContainer={{ marginRight: s(5) }}
            onPress={handleSubmit(onSubmit)}
            text="Tìm kiếm" />
          <ButtonComponent
            styleContainer={{ backgroundColor: Colors.red, borderColor: Colors.red, marginLeft: s(5) }}
            onPress={clearSearch}
            text="Huỷ bỏ" />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default React.memo(SearchComponent);