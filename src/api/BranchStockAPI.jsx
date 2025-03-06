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

  static async getBranchStocksWithBranchAndManyProduct({ branchId, productIds = [] }) {
    return axiosClient.get("/branch-stock/product", {
      params: {
        branchId: branchId,
        productIds: productIds, // Chuyển mảng thành chuỗi
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
}

export default BranchStockAPI;
