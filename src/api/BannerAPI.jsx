import { axiosClient, axiosPrivate } from "./Axios";

class BannerAPI {
  static async GetBanners(params = {}) {
    const url = "/banner";
    return axiosClient.get(url, { params });
  }

  static async AddBanner(data) {
    const url = "/banner";
    return axiosPrivate.post(url, data);
  }

  static async UpdateBanner(id, data) {
    const url = `/banner/${id}`;
    return axiosPrivate.put(url, data);
  }

  static async DeleteBanner(id) {
    const url = `/banner/${id}`;
    return axiosPrivate.delete(url);
  }

  static async GetProductBySlug(slug) {
    const url = `/banner/promotions/${slug}`;
    return axiosClient.get(url);
  }
}

export default BannerAPI;
