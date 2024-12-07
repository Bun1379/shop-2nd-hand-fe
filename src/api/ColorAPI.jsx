import { axiosClient, axiosPrivate } from "./Axios";

class ColorAPI {
  static async GetAllColors() {
    const url = "/color";
    return axiosClient.get(url);
  }

  static async CreateColor(data) {
    const url = "/color";
    return axiosPrivate.post(url, data);
  }

  static async UpdateColor(id, data) {
    const url = `/color/${id}`;
    return axiosPrivate.put(url, data);
  }
}

export default ColorAPI;
