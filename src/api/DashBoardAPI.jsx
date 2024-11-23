import { axiosClient, axiosPrivate } from "./Axios";

class DashBoardAPI {
  static async GetRevenueChart(startDate, endDate) {
    const url = `/dashboard/revenue-chart?fromDate=${startDate}&toDate=${endDate}`;
    return axiosPrivate.get(url);
  }
}

export default DashBoardAPI;
