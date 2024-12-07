import { axiosClient, axiosPrivate } from "./Axios";

class CategoryAPI {
  static async getAllCategories() {
    const url = "/category";
    return axiosClient.get(url);
  }

  static async createCategory(data) {
    const url = "/category";
    return axiosPrivate.post(url, data);
  }

  static async updateCategory(id, data) {
    const url = `/category/${id}`;
    return axiosPrivate.put(url, data);
  }
}

export default CategoryAPI;
