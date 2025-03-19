import { axiosClient, axiosPrivate } from "./Axios";

class BranchStockRequestAPI {
    static async createBranchStockRequest(data) {
        return axiosPrivate.post("/branch-stock-request", data);
    }
    static async getBranchStockRequest(params) {
        return axiosPrivate.get("/branch-stock-request", { params });
    }
    static async updateBranchStockRequestStatus(data) {
        return axiosPrivate.put("/branch-stock-request/status", data);
    }
    static async updateBranchStockRequestProductStatus(data) {
        return axiosPrivate.put("/branch-stock-request/product/status", data);
    }
}

export default BranchStockRequestAPI;