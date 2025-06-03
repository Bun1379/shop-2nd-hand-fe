import React from "react";
import { Container, Card } from "react-bootstrap";
import "./Policy.css";

const Policy = () => {
    return (
        <Container className="mt-5 mb-5">
            <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                    <h1 className="text-center mb-4">Chính sách mua bán/đổi trả</h1>

                    <div className="policy-section">
                        <h2>Thanh toán</h2>
                        <ul>
                            <li>Quý khách có thể yêu cầu hoàn tiền đơn hàng trong 1 tuần sau khi thanh toán mà không cần bất kì điều kiện gì.</li>
                            <li>Thời gian xử lý hoàn tiền từ 1-7 ngày tùy vào độ phức tạp của đơn hàng và số tiền cần xử lý.</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>Hoàn hàng</h2>
                        <ul>
                            <li>Hàng chỉ chấp nhận hoàn trong điều kiện không bị hư hại và cùng điều kiện lúc bạn vừa nhận sản phẩm.</li>
                            <li>
                                Để hoàn tiền bạn cần cung cấp
                                <span style={{ color: 'red', textTransform: 'uppercase' }}> video mở hàng</span>,
                                các hóa đơn thanh toán cho bên shop.
                            </li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>Đổi trả</h2>
                        <ul>
                            <li>Shop sẽ nhận đổi trả 1-1 cho các sản phẩm bị lỗi. Nếu bạn có sản phẩm lỗi như rách, chất lượng không như cam kết vui lòng liên hệ trực tiếp qua mail hoặc số điện thoại để được xử lý.</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>Hoàn tiền khi không tất toán được đơn do các vấn đề bất khả kháng</h2>
                        <ul>
                            <li>Trong một số trường hợp sản phẩm không thể về tay bạn do các lý do bất khả kháng ngoài ý muốn như bên vận chuyển làm mất hàng, bên bán lừa đảo không giao hàng. Shop sẽ xử lý hoàn tiền cho quý khách theo yêu cầu.</li>
                            <li>Tùy theo giá trị sản phẩm và độ phức tạp shop sẽ hoàn tất hoàn tiền trong 1 đến 30 ngày.</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>Chính sách giao hàng</h2>
                        <ul>
                            <li>Phạm vi vận chuyển: Toàn Việt Nam</li>
                            <li>Đơn vị vận chuyển: GHTK</li>
                            <li>Thời gian vận chuyển và mã đơn hàng sẽ được gửi qua email của quý khách.</li>
                            <li>Thời gian vận chuyển từ khi mã vận đơn được gửi qua email sẽ từ 1-7 ngày.</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>Bảo mật thông tin</h2>
                        <ul>
                            <li>Tất cả thông tin như e-mail, số điện thoại, tên thật của bạn được lưu trữ và mã hóa và cam kết không chia sẻ với bất kì bên thứ 3 nào.</li>
                            <li>Thông tin của bạn được lưu trữ và bảo vệ bởi các chứng chỉ điện tử liên quan.</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>Cần hỗ trợ thêm?</h2>
                        <p>Liên lạc với shop qua số điện thoại hoặc email để được hỗ trợ:</p>
                        <p>Điện thoại: 0123 456 789</p>
                        <p>Email: shopndhand13@gmail.com</p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Policy; 