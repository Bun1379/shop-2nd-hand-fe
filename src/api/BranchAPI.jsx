import { axiosClient, axiosPrivate } from "./Axios";

class BranchAPI {
  static async getAllBranches() {
    return axiosClient.get("/branch");
  }
  static async addBranch(data) {
    return axiosPrivate.post("/branch", data);
  }
  static async updateBranch(id, data) {
    return axiosPrivate.put(`/branch/${id}`, data);
  }
}

export default BranchAPI;
