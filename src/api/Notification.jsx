import { axiosClient, axiosPrivate } from "./Axios";

class NotificationAPI {
  static async GetNotifications() {
    const url = "/notification";
    return axiosPrivate.get(url);
  }

  static async ReadNotificatin(notificationId) {
    const url = `/notification/read/${notificationId}`;
    return axiosPrivate.put(url);
  }
}

export default NotificationAPI;
