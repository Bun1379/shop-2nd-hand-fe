import { axiosClient, axiosPrivate } from "./Axios";

class CancelRequestAPI {
  static async GetCancelRequests(params = {}) {
    const url = "/cancel-request";
    return axiosPrivate.get(url, { params });
  }

  static async CreateCancelRequest(data) {
    const url = "/cancel-request";
    return axiosPrivate.post(url, data);
  }

  static async GetCancelRequestsAdmin() {
    const url = `/cancel-request/admin`;
    return axiosPrivate.get(url);
  }

  static async ApproveCancelRequest(id) {
    const url = `/cancel-request/approve/${id}`;
    return axiosPrivate.put(url);
  }

  static async RejectCancelRequest(id) {
    const url = `/cancel-request/reject/${id}`;
    return axiosPrivate.put(url);
  }

  static async DeleteCancelRequest(id) {
    const url = `/cancel-request/${id}`;
    return axiosPrivate.delete(url);
  }
}

export default CancelRequestAPI;
