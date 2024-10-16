import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const PaymentResult = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const responseCode = queryParams.get("vnp_ResponseCode");

        if (responseCode === "00") {
            // Nếu thanh toán thành công
            toast.success("Thanh toán thành công!");
            navigate("/user-profile", { state: { initialSection: "orders" } });
        } else {
            // Nếu thanh toán thất bại
            toast.error("Thanh toán thất bại. Vui lòng thử lại.");
            navigate("/cart");
        }
    }, [location, navigate]);

    return <div>Đang xử lý kết quả thanh toán...</div>;
};

export default PaymentResult;
