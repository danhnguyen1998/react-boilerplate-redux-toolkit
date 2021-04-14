import configServices from "@src/utils/configServices";
import { SearchModel } from "./search.model";

export const fetchListOrder = async () => {
  try {
    const result = await configServices.getService('mobile/main');
    return result;
  } catch (error) {
    throw error;
  }
}

export const fetchListOrderSearch = async (searchModel: SearchModel) => {
  try {
    const result = await configServices.postService('mobile/find', searchModel);
    return result;
  } catch (error) {
    throw error;
  }
}

export const fetchBanks = async () => {
  try {
    const result = await configServices.getService('mobile/nganhang');
    return result;
  } catch (error) {
    throw error;
  }
}

export const fetchStatus = async () => {
  try {
    const result = await configServices.getService('mobile/tinhtrang');
    return result;
  } catch (error) {
    throw error;
  }
}