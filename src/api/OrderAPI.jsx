import { axiosClient, axiosPrivate } from "./Axios";

class OrderAPI {
  static async GetOrders() {
    const url = "/order";
    return axiosPrivate.get(url);
  }

  static async CreateOrder(data) {
    const url = "/order";
    return axiosPrivate.post(url, data);
  }

  static async GetOrderById(orderId) {
    const url = `/order/${orderId}`;
    return axiosPrivate.get(url);
  }
}

export default OrderAPI;
