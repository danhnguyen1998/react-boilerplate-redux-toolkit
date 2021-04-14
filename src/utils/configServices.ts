import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORE } from '@src/contants/asyncStorage';
import Config, { INVALID_TOKEN, RESPONSE_STATUS, TIME_EXPIRED } from '@src/contants/config';
import moment from 'moment';

const _responseConfig = async (response: Response) => {
  if (response.status === RESPONSE_STATUS.SUCESS) {
    return await response.json();
  }
  if (response.status === RESPONSE_STATUS.NOT_FOUND)
    throw Error('Máy chủ không phản hồi. Vui lòng liên hệ quản trị viên');
  if (response.status === RESPONSE_STATUS.INTERVAL_SERVER) {
    const result = await response.json();
    throw Error(result.error_description);
  }
  throw Error('Máy chủ gặp lỗi. Vui lòng liên hệ quản trị viên');
};

const postService = async (url: string, body: object, isAuthorization = true, isFormData = false) => {
  try {
    if (url !== 'sys/login') {
      const lastTime = await AsyncStorage.getItem(ASYNC_STORE.LAST_TIME);
      if (lastTime) {
        const diffTime = moment().diff(moment(lastTime), 'minutes');
        if (diffTime > TIME_EXPIRED) throw new Error('Phiên làm việc hết hạn, vui lòng đăng nhập lại!');
      } else throw new Error('Phiên làm việc hết hạn, vui lòng đăng nhập lại!');
    }
    const headers: any = isFormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { Accept: 'application/json', 'Content-Type': 'application/json' };
    if (isAuthorization) {
      headers.token = await AsyncStorage.getItem(ASYNC_STORE.TOKEN);
      headers.companyId = Config.COMPANY;
    }
    const requestInit: any = { method: 'POST', headers };
    if (body)
      if (isFormData) requestInit.body = body;
      else requestInit.body = JSON.stringify(body);
    const response = await fetch(`${Config.HOST_API}/${url}`, requestInit);
    await AsyncStorage.setItem(ASYNC_STORE.LAST_TIME, moment().toISOString());
    return await _responseConfig(response);
  } catch (error) {
    throw error;
  }
};

const getService = async (url: string, params?: any, body?: object | null, isAuthorization = true) => {
  try {
    if (url !== 'sys/login') {
      const lastTime = await AsyncStorage.getItem(ASYNC_STORE.LAST_TIME);
      if (lastTime) {
        const diffTime = moment().diff(moment(lastTime), 'minutes');
        if (diffTime > TIME_EXPIRED) throw new Error(INVALID_TOKEN);
      } else throw new Error(INVALID_TOKEN);
    }
    const headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (isAuthorization) {
      headers.token = await AsyncStorage.getItem(ASYNC_STORE.TOKEN);
      headers.companyId = Config.COMPANY;
    }
    const requestInit: any = { method: 'GET', headers };
    if (body) requestInit.body = JSON.stringify(body);
    let queryString = '';
    if (params)
      queryString = `/${Object.keys(params)
        .map((key) => params[key] || '')
        .join('/')}`;
    const response = await fetch(`${Config.HOST_API}/${url}${queryString}`, requestInit);
    await AsyncStorage.setItem(ASYNC_STORE.LAST_TIME, moment().toISOString());
    return await _responseConfig(response);
  } catch (error) {
    throw error;
  }
};

export default { postService, getService };
