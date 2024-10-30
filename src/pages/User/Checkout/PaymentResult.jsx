import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import PaymentAPI from "../../../api/PaymentAPI";

function PaymentResult() {
    const location = useLocation();
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    async function verifyPayment() {
        try {
            const params = new URLSearchParams(location.search);
            const rs = await PaymentAPI.getPaymentVerify(params);

            if (rs.status === 200) {
                setIsPaymentSuccessful(true);
                toast.success("Thanh toán thành công");
            } else {
                setIsPaymentSuccessful(false);
                toast.error("Thanh toán không thành công");
            }
        } catch (error) {
            setIsPaymentSuccessful(false);
            setErrorMessage(error.response?.data?.EM || "Có lỗi xảy ra khi xác thực thanh toán");
            toast.error("Lỗi khi thanh toán: " + error.response?.data?.EM);
        }
    }
    useEffect(() => {
        verifyPayment();
    }, [location]);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Kết quả thanh toán</h1>
            {isPaymentSuccessful === null ? (
                <p>Đang kiểm tra kết quả thanh toán...</p>
            ) : isPaymentSuccessful ? (
                <p style={{ color: "green" }}>Thanh toán thành công! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
            ) : (
                <p style={{ color: "red" }}>
                    Thanh toán không thành công. {errorMessage && <span> Lỗi: {errorMessage}</span>}
                </p>
            )}
            <button
                onClick={() => window.location.href = "/"}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    marginTop: "20px",
                    backgroundColor: "#388E3C",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px"
                }}
            >
                Quay lại trang chủ
            </button>
        </div>
    );
}

export default PaymentResult;
