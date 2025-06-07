import { axiosClient, axiosPrivate } from "./Axios";

class LogAPI {
  static async getLogs(params = {}) {
    const url = "/log";
    return axiosPrivate.get(url, { params });
  }
}

export default LogAPI;
