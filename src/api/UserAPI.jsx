import { axiosClient, axiosPrivate } from "./Axios";

class UserAPI {
    static async UpdateUser(data) {
        const url = "/user/update";
        return axiosPrivate.put(url, data);
    }
    static async GetUserInfo() {
        const url = "/user/info";
        return axiosPrivate.get(url);
    }
}

export default UserAPI;