import { axiosClient, axiosPrivate } from "./Axios";

class DiscountAPI {
  static async getDiscountPercentages(coupon) {
    const url = "/discount/code";
    return axiosPrivate.get(url, { params: { discountCode: coupon } });
  }
}

export default DiscountAPI;
