import { axiosClient, axiosPrivate } from "./Axios";

class PaymentAPI {
    static async postPayments(data) {
        const url = "/payment";
        return axiosPrivate.post(url, data);
    }

    static async getPaymentsResult(params = {}) {
        const url = "/payment/result";
        return axiosClient.get(url, params);
    }
}

export default PaymentAPI;