import { axiosClient, axiosPrivate } from "./Axios";

class NotificationAPI {
  static async GetNotifications() {
    const url = "/notification";
    return axiosPrivate.get(url);
  }
}

export default NotificationAPI;
