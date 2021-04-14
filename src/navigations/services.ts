import configServices from "@src/utils/configServices";

export const fetchUserInfor = async (username: string) => {
  try {
    const result = await configServices.getService('mobile/nhanvien', { username });
    return result;
  } catch (error) {
  }
}