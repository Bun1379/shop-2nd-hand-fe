import { axiosClient, axiosPrivate } from "./Axios";

class DashBoardAPI {
  static async GetRevenueChart(startDate, endDate) {
    const url = `/dashboard/revenue-chart?fromDate=${startDate}&toDate=${endDate}`;
    return axiosPrivate.get(url);
  }

  static async GetCateSellerChart(startDate, endDate) {
    const url = `/dashboard/seller-category?fromDate=${startDate}&toDate=${endDate}`;
    return axiosPrivate.get(url);
  }

  static async GetRevenueChartByMonth(year) {
    const url = `/dashboard/revenue-chart-by-month?year=${year}`;
    return axiosPrivate.get(url);
  }

  static async GetDashboardStats() {
    const url = "/dashboard/stats";
    return axiosPrivate.get(url);
  }

  static async GetOrderStats() {
    const url = "/dashboard/order-status-distribution";
    return axiosPrivate.get(url);
  }
}

export default DashBoardAPI;
