import { axiosClient, axiosPrivate } from "./Axios";

class BranchStockRequestAPI {
    static async createBranchStockRequest(data) {
        return axiosPrivate.post("/branch-stock-request", data);
    }
    static async getBranchStockRequest(params) {
        return axiosPrivate.get("/branch-stock-request", { params });
    }
}

export default BranchStockRequestAPI;