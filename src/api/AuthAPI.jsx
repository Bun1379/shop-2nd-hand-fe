import { axiosClient, axiosPrivate } from "./Axios";

class AuthAPI {
    static async Signup(data) {
        const url = "/auth/signup";
        return axiosClient.post(url, data);
    }

    static async Login(data) {
        const url = "/auth/login";
        return axiosClient.post(url, data);
    }

    static async SendOTP(data) {
        const url = "/auth/send-otp";
        return axiosClient.post(url, data);
    }

    static async ResetPW(data) {
        const url = "/auth/reset-password";
        return axiosClient.post(url, data);
    }
    static async VerifiedUser(data) {
        const url = "/auth/verified-user";
        return axiosClient.post(url, data);
    }
}

export default AuthAPI;