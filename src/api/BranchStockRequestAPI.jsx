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
    static async deleteBranchStockRequest(id) {
        return axiosPrivate.delete(`/branch-stock-request/${id}`);
    }
}

export default BranchStockRequestAPI;