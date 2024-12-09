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

  static async GetOrderByAdmin() {
    const url = "/order/admin";
    return axiosPrivate.get(url);
  }

  static async UpdateOrderStatus(orderId, data) {
    const url = `/order/${orderId}/status`;
    return axiosPrivate.put(url, data);
  }

  static async UpdateOrderPaymnentStatus(orderId, data) {
    const url = `/order/${orderId}/payment-status`;
    return axiosPrivate.put(url, data);
  }

  static async CancelOrder(orderId) {
    const url = `/order/cancel-order/${orderId}`;
    return axiosPrivate.put(url);
  }
}

export default OrderAPI;
