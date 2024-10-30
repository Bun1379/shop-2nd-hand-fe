import { axiosClient, axiosPrivate } from "./Axios";

class ColorAPI {
  static async GetAllColors() {
    const url = "/color";
    return axiosClient.get(url);
  }
}

export default ColorAPI;
