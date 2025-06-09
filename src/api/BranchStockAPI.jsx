import { axiosClient, axiosPrivate } from "./Axios";

class BranchStockAPI {
  static async getBranchStocksWithBranch(branchId) {
    return axiosPrivate.get("/branch-stock/branch/" + branchId);
  }

  static async getBranchStocksWithBranchAndProduct(branchId, productId) {
    return axiosPrivate.get(
      "/branch-stock/branch/" + branchId + "/product/" + productId
    );
  }

  static async getBranchStocksWithBranchAndManyProduct({ branchId, products = [] }) {
    return axiosClient.get("/branch-stock/product", {
      params: {
        branchId: branchId,
        products: products,
      },
    });
  }

  static async updateBranchStock(branchId, productId, data) {
    return axiosPrivate.put(
      "/branch-stock/branch/" + branchId + "/product/" + productId,
      data
    );
  }
  static async getBranchStockWithProduct(productId) {
    return axiosClient.get("/branch-stock/product/" + productId);
  }

  static async createBranchStockRequest(data) {
    return axiosPrivate.post("/branch-stock/request", data);
  }
}

export default BranchStockAPI;
