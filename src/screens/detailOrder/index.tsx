import { useAppSelector } from '@src/boot/configureStore';
import PickerComponent from '@src/containers/components/PickerComponent';
import { isLoading } from '@src/containers/redux/slice';
import { RESPONSE_STATUS } from '@src/contants/config';
import { Colors } from '@src/styles/colors';
import { s } from '@src/styles/scalingUtils';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, TextInput, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { Props } from './propState';
import { fetchDetailOrder, fetchUpdateDetailOrder } from './services';
import { DetailOrderUpdateModel } from './services/detailOrder.model';
import styles from './styles';

interface IFormInputs {
  is_giao_van_da_nhan_hang: boolean;
  is_kt_ktra: boolean;
  tien_hang_tra_lai: string;
  tien_tt_tien_mat: string;
  tien_tt_chuyen_khoan: string;
  tien_tt_the: string;
  ma_ngh: string;
  ma_ttgh: string;
  ghi_chu: string;
}

const DetailOrderComponent = (props: Props) => {
  const dispatch = useDispatch();
  const authState = useAppSelector((state) => state.authState);

  const { control, handleSubmit, setValue, getValues } = useForm<IFormInputs>({
    defaultValues: {
      is_giao_van_da_nhan_hang: false,
      is_kt_ktra: false,
      tien_hang_tra_lai: '0',
      tien_tt_tien_mat: '0',
      tien_tt_chuyen_khoan: '0',
      tien_tt_the: '0',
      ma_ngh: '',
      ma_ttgh: '',
      ghi_chu: '',
    },
  });

  const [state, setState] = useState({
    bankSelect: '',
    detailOrder: { ph: [], ct: [] },
    totalQuanlity: 0,
    totalPrice: 0,
    disabledNhanHang: true,
    disabledTest: true,
    editHangTraLai: false,
    editTienMat: false,
    editChuyenKhoan: false,
    editThanhToanBangThe: false,
    disabledNganHang: true,
    disabledTrangThai: true,
    editGhiChu: false,
  });

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ paddingHorizontal: s(15) }} onPress={handleSubmit(onSubmit)}>
          <Icon name="save-outline" color={Colors.white} size={25} />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);

  useEffect(() => {
    initdata();
  }, []);

  const initdata = async () => {
    try {
      dispatch(isLoading(true));
      const detailOrder = await fetchDetailOrder({
        stt_rec: props.route.params.stt_rec,
        stt_rec0: props.route.params.stt_rec0,
      });
      if (detailOrder.status.code === RESPONSE_STATUS.SUCESS && detailOrder.data) {
        let totalQuanlity = 0;
        let totalPrice = 0;
        let disabledNhanHang = true;
        let disabledTest = true;
        let editHangTraLai = false;
        let editTienMat = false;
        let editChuyenKhoan = false;
        let editThanhToanBangThe = false;
        let disabledNganHang = true;
        let disabledTrangThai = true;
        let editGhiChu = false;
        if (detailOrder.data.ct && detailOrder.data.ct.length > 0) {
          detailOrder.data.ct.map((item: any) => {
            totalQuanlity += item.so_luong;
            totalPrice += item.so_luong * item.gia;
          });
        }
        if (detailOrder.data.ph && detailOrder.data.ph?.[0]) {
          if (detailOrder.data.ph?.[0]['is_kythuat']) {
            const checkTest = detailOrder.data.ph?.[0]['is_kt_ktra'];
            if (!checkTest) disabledTest = false;
          } else {
            if (!detailOrder.data.ph?.[0]['is_nguoi_chiu_trach_nhiem']) {
              const checkNhanHang = detailOrder.data.ph?.[0]['is_giao_van_da_nhan_hang'];
              if (!checkNhanHang) disabledNhanHang = false;
              disabledTrangThai = false;
              editGhiChu = true;
            } else {
              const checkNhanHang = detailOrder.data.ph?.[0]['is_giao_van_da_nhan_hang'];
              if (!checkNhanHang) disabledNhanHang = false;
              editHangTraLai = true;
              editTienMat = true;
              editChuyenKhoan = true;
              editThanhToanBangThe = true;
              disabledNganHang = false;
              disabledTrangThai = false;
              editGhiChu = true;
            }
          }
          setValue('is_giao_van_da_nhan_hang', detailOrder.data.ph?.[0]?.['is_giao_van_da_nhan_hang'] || false);
          setValue('is_kt_ktra', detailOrder.data.ph?.[0]?.['is_kt_ktra'] || false);
          setValue('tien_hang_tra_lai', detailOrder.data.ph?.[0]?.['tien_hang_tra_lai'] || 0);
          setValue('tien_tt_tien_mat', detailOrder.data.ph?.[0]?.['tien_tt_tien_mat'] || 0);
          setValue('tien_tt_chuyen_khoan', detailOrder.data.ph?.[0]?.['tien_tt_chuyen_khoan'] || 0);
          setValue('tien_tt_the', detailOrder.data.ph?.[0]?.['tien_tt_the'] || 0);
          setValue('ma_ngh', detailOrder.data.ph?.[0]?.['ma_ngh'] || '');
          setValue('ma_ttgh', detailOrder.data.ph?.[0]?.['ma_ttgh'] || '');
          setValue('ghi_chu', detailOrder.data.ph?.[0]?.['ghi_chu'] || '');
        }
        setState((state) => ({
          ...state,
          detailOrder: detailOrder.data,
          totalQuanlity,
          totalPrice,
          disabledNhanHang,
          disabledTest,
          editHangTraLai,
          editTienMat,
          editChuyenKhoan,
          editThanhToanBangThe,
          disabledNganHang,
          disabledTrangThai,
          editGhiChu,
        }));
      }
    } catch (error) {
      props.navigation.setOptions({ headerRight: () => null });
      Alert.alert('Lỗi', error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

  const onSubmit = async (data: IFormInputs) => {
    await dispatch(isLoading(true));
    try {
      console.log(data, "data");
      const dataUpdate: DetailOrderUpdateModel = {
        stt_rec: props.route.params.stt_rec,
        stt_rec0: props.route.params.stt_rec0,
        is_giao_van_da_nhan_hang: data.is_giao_van_da_nhan_hang,
        is_kt_ktra: data.is_kt_ktra,
        tien_hang_tra_lai: data.tien_hang_tra_lai && data.tien_hang_tra_lai != ''
          ? parseFloat(data.tien_hang_tra_lai.toString().replace(/,/g, '')) : 0,
        tien_tt_tien_mat: data.tien_tt_tien_mat && data.tien_tt_tien_mat != ''
          ? parseFloat(data.tien_tt_tien_mat.toString().replace(/,/g, '')) : 0,
        tien_tt_chuyen_khoan: data.tien_tt_chuyen_khoan && data.tien_tt_chuyen_khoan != ''
          ? parseFloat(data.tien_tt_chuyen_khoan.toString().replace(/,/g, '')) : 0,
        tien_tt_the: data.tien_tt_the && data.tien_tt_the != ''
          ? parseFloat(data.tien_tt_the.toString().replace(/,/g, '')) : 0,
        ma_ngh: data.ma_ngh,
        ma_ttgh: data.ma_ttgh,
        ghi_chu_gh: data.ghi_chu,
        ma_nvgh: authState.accountInfor?.['username'] || '',
      };
      const update = await fetchUpdateDetailOrder(dataUpdate);
      if (update.status.code === RESPONSE_STATUS.SUCESS) {
        Alert.alert('Thông báo', 'Cập nhật dữ liệu thành công!', [
          {
            text: 'OK',
            onPress: () => {
              props.route.params.refreshList();
              props.navigation.goBack();
            },
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    } finally {
      await dispatch(isLoading(false));
    }
  };

  const _onChangePicker = (field: keyof IFormInputs) => (item: any) => {
    setValue(field, item[field]);
  };

  const _changeCheckBox = (field: keyof IFormInputs) => () => {
    const currentValue = getValues(field);
    setValue(field, !currentValue);
  };

  const _onChangeText = (field: keyof IFormInputs) => (text: string, rawText?: string) => {
    setValue(field, text);
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.groupView}>
        <Text style={styles.groupViewName}>
          {[state.detailOrder.ph[0]?.['ten_kh'], state.detailOrder.ph[0]?.['so_dien_thoai']].join(' - ')}
        </Text>
        <Text style={styles.groupViewContent}>{state.detailOrder.ph[0]?.['dia_chi']}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.groupViewContent, { marginRight: s(10) }]}>Số:</Text>
            <Text style={styles.groupViewContent}>{state.detailOrder.ph[0]?.['so_ct']}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.groupViewContent, { marginRight: s(10) }]}>Ngày:</Text>
            <Text style={[styles.groupViewContent, { marginRight: s(10) }]}>
              {state.detailOrder.ph[0]?.['ngay_ct']
                ? moment(state.detailOrder.ph[0]?.['ngay_ct']).format('DD/MM/YYYY')
                : ''}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: s(10) }}>
        <Controller
          control={control}
          render={({ value }) => (
            <CheckBox
              checked={value}
              disabled={state.disabledNhanHang}
              title="Giao vận nhận hàng"
              containerStyle={styles.checkboxContainer}
              onPress={_changeCheckBox('is_giao_van_da_nhan_hang')}
            />
          )}
          name="is_giao_van_da_nhan_hang"
        />
        <Controller
          control={control}
          render={({ value }) => (
            <CheckBox
              checked={value}
              disabled={state.disabledTest}
              title="Kỹ thuật test OK"
              containerStyle={styles.checkboxContainer}
              onPress={_changeCheckBox('is_kt_ktra')}
            />
          )}
          name="is_kt_ktra"
        />
      </View>
      <View style={styles.groupViewHeader}>
        <Text style={styles.groupViewHeaderText}>Thông tin thanh toán</Text>
      </View>
      <View style={styles.groupViewDetail}>
        <View style={styles.viewGroup}>
          <Text style={styles.viewText}>Đã đặt cọc:</Text>
          <TextInput
            style={styles.viewInputText}
            editable={false}
            value={((state.detailOrder.ph[0]?.['tien_da_dat_coc'] as any) || 0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </View>
        <View style={styles.viewGroup}>
          <Text style={styles.viewText}>Hàng trả lại:</Text>
          <Controller
            control={control}
            render={({ onBlur, value }) => (
              <TextInputMask
                style={styles.viewInputText}
                type={'money'}
                options={{ precision: 0, delimiter: ',', unit: '', suffixUnit: '' }}
                value={value}
                onChangeText={_onChangeText('tien_hang_tra_lai')}
                keyboardType="number-pad"
                onBlur={onBlur}
                editable={state.editHangTraLai}
              />
            )}
            name="tien_hang_tra_lai"
          />
        </View>
        <View style={styles.viewGroup}>
          <Text style={styles.viewText}>Còn phải trả:</Text>
          <TextInput
            style={[styles.viewInputText, { color: Colors.red }]}
            editable={false}
            value={((state.detailOrder.ph[0]?.['tien_con_phai_tt'] as any) || 0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </View>
        <View style={styles.viewGroup}>
          <Text style={styles.viewText}>TM:</Text>
          <Controller
            control={control}
            render={({ onBlur, value }) => (
              <TextInputMask
                placeholder="Tiền mặt"
                style={styles.viewInputText}
                type={'money'}
                options={{ precision: 0, delimiter: ',', unit: '', suffixUnit: '' }}
                value={value}
                onChangeText={_onChangeText('tien_tt_tien_mat')}
                keyboardType="number-pad"
                onBlur={onBlur}
                editable={state.editTienMat}
              />
            )}
            name="tien_tt_tien_mat"
          />
        </View>
        <View style={styles.viewGroup}>
          <Text style={styles.viewText}>CK:</Text>
          <Controller
            control={control}
            render={({ onBlur, value }) => (
              <TextInputMask
                placeholder="Chuyển khoản"
                style={styles.viewInputText}
                type={'money'}
                options={{ precision: 0, delimiter: ',', unit: '', suffixUnit: '' }}
                value={value}
                onChangeText={_onChangeText('tien_tt_chuyen_khoan')}
                keyboardType="number-pad"
                onBlur={onBlur}
                editable={state.editChuyenKhoan}
              />
            )}
            name="tien_tt_chuyen_khoan"
          />
        </View>
        <View style={styles.viewGroup}>
          <Text style={styles.viewText}>Thẻ:</Text>
          <Controller
            control={control}
            render={({ onBlur, value }) => (
              <TextInputMask
                placeholder="Thanh toán bằng thẻ"
                style={styles.viewInputText}
                type={'money'}
                options={{ precision: 0, delimiter: ',', unit: '', suffixUnit: '' }}
                value={value}
                onChangeText={_onChangeText('tien_tt_the')}
                keyboardType="number-pad"
                onBlur={onBlur}
                editable={state.editThanhToanBangThe}
              />
            )}
            name="tien_tt_the"
          />
        </View>
        <View style={styles.viewGroup}>
          <Text style={styles.viewText}>NH:</Text>
          <Controller
            control={control}
            render={({ value }) => (
              <PickerComponent
                placeholder="Chọn ngân hàng"
                selectedValue="ma_ngh"
                selectedText="ten_ngh"
                data={props.route.params.banks}
                value={value}
                disabled={state.disabledNganHang}
                onChange={_onChangePicker('ma_ngh')}
              />
            )}
            name="ma_ngh"
          />
        </View>
        <View style={styles.viewGroup}>
          <Text style={styles.viewText}>Trạng thái:</Text>
          <Controller
            control={control}
            render={({ value }) => (
              <PickerComponent
                placeholder="Chọn trạng thái"
                selectedValue="ma_ttgh"
                selectedText="ten_ttgh"
                data={props.route.params.status}
                value={value}
                disabled={state.disabledTrangThai}
                onChange={_onChangePicker('ma_ttgh')}
              />
            )}
            name="ma_ttgh"
          />
        </View>
        <View style={styles.viewGroup}>
          <Text style={styles.viewText}>Ghi chú:</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.viewInputText}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                editable={state.editGhiChu}
              />
            )}
            name="ghi_chu"
          />
        </View>
      </View>
      <View style={styles.groupViewAmount}>
        <View style={styles.groupViewSub}>
          <Text style={styles.groupViewTextLeft}>SL: </Text>
          <Text style={styles.groupViewTextRight}>{state.totalQuanlity}</Text>
        </View>
        <View style={styles.groupViewSub}>
          <Text style={styles.groupViewTextLeft}>Tiền: </Text>
          <Text style={styles.groupViewTextRight}>
            {state.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>
      </View>
      {state.detailOrder.ct && state.detailOrder.ct.length > 0
        ? state.detailOrder.ct.map((item, index) => (
          <View style={[styles.listDetailContainer]} key={`index_${index}`}>
            <Text style={styles.listDetailTen}>{item['ten_vt']}</Text>
            <View style={styles.listDetailView}>
              <Text style={[styles.listDetailQuantity, { width: '10%' }]}>SL : </Text>
              <Text style={[styles.lisDetailAmount, { width: '10%' }]}>
                {((item['so_luong'] as any) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
              <Text style={[styles.listDetailQuantity, { width: '10%', textAlign: "center" }]}>x</Text>
              <Text style={[styles.listDetailQuantity, { width: '10%', textAlign: "center" }]}>Giá : </Text>
              <Text style={[styles.lisDetailAmount, { width: '25%' }]}>
                {((item['gia'] as any) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
              <Text style={[styles.listDetailQuantity, { width: '10%', textAlign: "center" }]}>=</Text>
              <Text style={[styles.lisDetailAmount, { color: Colors.red, width: '25%' }]}>
                {((item['thanh_tien'] as any) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </View>
          </View>
        ))
        : null}
    </KeyboardAwareScrollView>
  );
};

export default React.memo(DetailOrderComponent);
