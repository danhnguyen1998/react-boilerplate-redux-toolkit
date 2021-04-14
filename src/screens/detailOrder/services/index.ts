import configServices from "@src/utils/configServices";
import { DetailOrderSearchModel, DetailOrderUpdateModel } from "./detailOrder.model";

export const fetchDetailOrder = async (detailOrderSearch: DetailOrderSearchModel) => {
  try {
    const result = await configServices.postService('mobile/detail', detailOrderSearch);
    return result;
  } catch (error) {
  }
}

export const fetchUpdateDetailOrder = async (detailOrderUpdate: DetailOrderUpdateModel) => {
  try {
    const result = await configServices.postService('mobile/update', detailOrderUpdate);
    return result;
  } catch (error) {
  }
}