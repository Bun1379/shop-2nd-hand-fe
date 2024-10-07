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

  static async GetProductPurchased() {
    const url = "/order/product-purchased";
    return axiosPrivate.get(url);
  }

  static async GetOrderByAdmin(params = {}) {
    const url = "/order/admin";
    return axiosPrivate.get(url, { params });
  }

  static async UpdateOrderStatus(orderId, data) {
    const url = `/order/${orderId}/status`;
    return axiosPrivate.put(url, data);
  }
}

export default OrderAPI;
