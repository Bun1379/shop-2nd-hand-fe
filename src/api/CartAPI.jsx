import { axiosClient, axiosPrivate } from "./Axios";

class CartAPI {
  static async GetCart() {
    const url = "/cart";
    return axiosPrivate.get(url);
  }

  static async UpdateQuantity(data) {
    const url = `/cart`;
    return axiosPrivate.put(url, data);
  }
}

export default CartAPI;
