import { axiosClient, axiosPrivate } from "./Axios";

class DiscountAPI {
  static async getDiscountPercentages(coupon) {
    const url = "/discount/code";
    return axiosPrivate.get(url, { params: { discountCode: coupon } });
  }

  static async getDiscounts(params = {}) {
    const url = "/discount";
    return axiosPrivate.get(url, { params });
  }

  static async createDiscount(data) {
    const url = "/discount";
    return axiosPrivate.post(url, data);
  }

  static async getAllValidDiscount(params = {}) {
    const url = "/discount/all";
    return axiosClient.get(url, { params });
  }
}

export default DiscountAPI;
