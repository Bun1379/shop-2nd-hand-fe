import { axiosClient, axiosPrivate } from "./Axios";

class UserAPI {
  static async GetUserAdmin(params = {}) {
    const url = "/user";
    return axiosPrivate.get(url, { params });
  }
  static async PutUpdateUserAdmin(id, data) {
    const url = `/user/update/${id}`;
    return axiosPrivate.put(url, data);
  }
  static async UpdateUser(data) {
    const url = "/user/update";
    return axiosPrivate.put(url, data);
  }
  static async GetUserInfo() {
    const url = "/user/info";
    return axiosPrivate.get(url);
  }
  static async PutUpdateFavorite(productId) {
    const url = "/user/favorite";
    return axiosPrivate.put(url, { productId });
  }
  static async PutUpdateDiscount(discountCode) {
    const url = "/user/discount";
    return axiosPrivate.put(url, { discountCode });
  }
}

export default UserAPI;
