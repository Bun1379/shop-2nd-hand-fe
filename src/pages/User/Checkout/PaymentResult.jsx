import { useLocation, useNavigate } from "react-router-dom";

function PaymentResult() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const OrderId = params.get("vnp_TxnRef").split('-ATTEMPT')[0];
    const ResponseCode = params.get("vnp_ResponseCode");

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Kết quả thanh toán</h1>
            {ResponseCode == "00" ? (
                <p style={{ color: "green" }}>Thanh toán thành công! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
            ) : (
                <p style={{ color: "red" }}>
                    Thanh toán không thành công. Mã lỗi : {ResponseCode}. Vui lòng chụp màn hình và liên hệ với chúng tôi để xử lý.
                </p>
            )}
            <button
                onClick={() => navigate("/user-profile", { state: { initialSection: "orders" } }, { replace: true })
                }
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
                Quay về trang quản lý đơn hàng
            </button>
        </div>
    );
}

export default PaymentResult;
