import { useAppSelector } from '@src/boot/configureStore';
import { isLoading } from '@src/containers/redux/slice';
import { RESPONSE_STATUS } from '@src/contants/config';
import { signOut } from '@src/navigations/redux/slice';
import { APP_NAVIGATION } from '@src/navigations/routes';
import { Colors } from '@src/styles/colors';
import { ContainerStyled } from '@src/styles/common';
import { s } from '@src/styles/scalingUtils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { Props } from './propState';
import { fetchBanks, fetchListOrder, fetchListOrderSearch, fetchStatus } from './services';
import styles from './styles';

const HomeComponent = (props: Props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    data: new Array(),
    banks: new Array(),
    status: new Array(),
  });

  const searchState = useAppSelector((state) => state.searchState);
  const authState = useAppSelector((state) => state.authState);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    loadBanksAndStatus().then(() => {
      loadListOrder(searchState.tel, searchState.ten_kh, searchState.so_ct);
    }).catch((error) => {
      Alert.alert('Lỗi', error.message);
    });
  }, [searchState]);

  const loadBanksAndStatus = async () => {
    try {
      await dispatch(isLoading(true));
      let bankDatas = new Array();
      let statusDatas = new Array();
      const banks = await fetchBanks();
      if (banks.status.code === RESPONSE_STATUS.SUCESS && banks.data.length > 0) bankDatas = banks.data;
      const status = await fetchStatus();
      if (status.status.code === RESPONSE_STATUS.SUCESS && status.data.length > 0) statusDatas = status.data;
      setState((state) => ({ ...state, banks: bankDatas, status: statusDatas }));
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    } finally {
      await dispatch(isLoading(false));
    }
  };

  const loadListOrder = async (tel: string, ten_kh: string, so_ct: string) => {
    try {
      await dispatch(isLoading(true));
      let data: any = null;
      if (tel == '' && ten_kh == '' && so_ct == '') {
        data = await fetchListOrder();
      } else {
        data = await fetchListOrderSearch({
          ma_nvgh: authState.accountInfor?.['username'] || '',
          tel,
          ten_kh,
          so_ct,
        });
      }
      if (data.status.code === RESPONSE_STATUS.SUCESS && data.data.length > 0)
        setState((state) => ({ ...state, data: data?.data }));
      else setState((state) => ({ ...state, data: [] }));
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    } finally {
      await dispatch(isLoading(false));
    }
  };

  const _showDetail = (item: any) => () => {
    props.navigation.push(APP_NAVIGATION.DETAIL_ORDER, {
      stt_rec: item.stt_rec,
      stt_rec0: item.stt_rec0,
      banks: state.banks as any,
      status: state.status as any,
      refreshList: _refreshList,
    });
  };

  const _refreshList = () => {
    loadListOrder(searchState.tel, searchState.ten_kh, searchState.so_ct);
  };

  const _gotoSearch = () => {
    props.navigation.push(APP_NAVIGATION.SEARCH);
  };

  const _logout = () => {
    dispatch(signOut());
  };

  const _renderItem = ({ item, index }: any) => (
    <TouchableOpacity style={styles.itemContainer} key={index} onPress={_showDetail(item)}>
      <View style={styles.itemTitle}>
        <Text style={styles.itemTitleText}>
          {item.ten_kh}
          {item.so_dien_thoai ? ` - ${item.so_dien_thoai}` : null}
        </Text>
        <Text style={styles.itemSubTitleText}>
          {item.dia_chi}
        </Text>
      </View>

      <View style={styles.itemRow}>
        <View style={[styles.itemRowColumnFirst, { width: "18%" }]}>
          <Text style={styles.itemRowHeader}>Số CT</Text>
          <Text style={styles.itemRowDetail}>{item.so_ct}</Text>
        </View>
        <View style={[styles.itemRowColumn, { width: "20%" }]}>
          <Text style={styles.itemRowHeader}>Ngày CT</Text>
          <Text style={styles.itemRowDetail}>{item.ngay_ct ? moment(item.ngay_ct).format('DD/MM/YYYY') : null}</Text>
        </View>
        <View style={[styles.itemRowColumn, { width: "23%" }]}>
          <Text style={[styles.itemRowHeader, styles.text_right]}>Tiền hàng</Text>
          <Text style={[styles.itemRowDetail, styles.text_right]}>
            {item.tien_hang?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>
        <View style={[styles.itemRowColumn, { width: "31%" }]}>
          <Text style={styles.itemRowHeader}>Trạng thái</Text>
          <Text style={styles.itemRowDetail}>{item.ten_ttgh}</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
    </TouchableOpacity>
  );

  const _keyExtractor = (_item: any, index: number) => index.toString();

  return (
    <>
      <StatusBar translucent={true} backgroundColor={Colors.primaryColor} barStyle="light-content" />
      <ContainerStyled>
        <FlatList
          style={{ flex: 1, backgroundColor: Colors.white }}
          keyExtractor={_keyExtractor}
          data={state.data}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>Không tồn tại đơn hàng!</Text>
            </View>
          }
        />
        <View style={styles.groupButton}>
          <TouchableOpacity style={styles.btnTouch} onPress={_refreshList}>
            <Icon name="refresh-outline" size={s(40)} color={Colors.manatee} />
            <Text style={styles.btnText}>Làm mới</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTouch} onPress={_gotoSearch}>
            <Icon name="search-outline" size={s(40)} color={Colors.primaryColor} />
            <Text style={[styles.btnText, { color: Colors.primaryColor }]}>Tìm kiếm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTouch} onPress={_logout}>
            <Icon name="log-out-outline" size={s(40)} color={Colors.red} />
            <Text style={[styles.btnText, { color: Colors.red }]}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ContainerStyled>
    </>
  );
};

export default React.memo(HomeComponent);
