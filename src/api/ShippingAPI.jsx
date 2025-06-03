import { axiosClient } from "./Axios";

class ShippingAPI {
  static async getShippingMethods(params = {}) {
    return axiosClient.get(`/shipping/calculate`, { params });
  }
}

export default ShippingAPI;
