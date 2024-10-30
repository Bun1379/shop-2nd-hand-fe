import { axiosClient, axiosPrivate } from "./Axios";

class PaymentAPI {
    static async postPayment(data) {
        const url = "/payment/create_payment_url";
        return axiosPrivate.post(url, data);
    }

    static async getPaymentVerify(params = {}) {
        const url = "/payment/vnpay_verify";
        return axiosClient.get(url, { params });
    }
}

export default PaymentAPI;