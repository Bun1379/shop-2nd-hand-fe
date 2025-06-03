import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaUserCog,
  FaBox,
  FaHome,
  FaBlog,
} from "react-icons/fa";
import { CiBoxList, CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { RiCoupon2Fill } from "react-icons/ri";
import { IoMdColorPalette } from "react-icons/io";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { FaTruck, FaTshirt, FaChartLine, FaTags } from "react-icons/fa";
import LogoutModal from "../LogoutModal/LogoutModal";
import { useState } from "react";

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true); // Mở modal
  const handleClose = () => setShowModal(false); // Đóng modal
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Sidebar collapsed={collapsed} className="h-100">
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <MenuItem
            icon={<FaHome />}
            component={<Link to="/" />}
            className="pt-3 pb-3"
          >
            {" "}
            Ishio Store
          </MenuItem>
          <MenuItem icon={<FaChartLine />} component={<Link to="/admin" />}>
            {" "}
            Thống kê
          </MenuItem>
          <SubMenu label="Quản lý" icon={<CiBoxList />}>
            <MenuItem
              icon={<FaTshirt />}
              component={<Link to="/admin/product" />}
            >
              {" "}
              Sản phẩm
            </MenuItem>
            <MenuItem
              icon={<FaTruck />}
              component={<Link to="/admin/branch-stock-request" />}
            >
              {" "}
              Yêu cầu nhập hàng
            </MenuItem>

            <MenuItem icon={<FaBox />} component={<Link to="/admin/order" />}>
              {" "}
              Đơn hàng
            </MenuItem>

            <MenuItem
              icon={<MdCancel />}
              component={<Link to="/admin/cancel-request" />}
            >
              {" "}
              Yêu cầu hủy đơn
            </MenuItem>
            {user.role === "ADMIN" && (
              <>
                <MenuItem
                  icon={<FaUserCog />}
                  component={<Link to="/admin/user" />}
                >
                  {" "}
                  Người dùng
                </MenuItem>
                <MenuItem
                  icon={<RiCoupon2Fill />}
                  component={<Link to="/admin/discount" />}
                >
                  {" "}
                  Mã giảm giá
                </MenuItem>
                <MenuItem
                  icon={<FaHome />}
                  component={<Link to="/admin/banner" />}
                >
                  {" "}
                  Banner
                </MenuItem>
                <MenuItem
                  icon={<FaBlog />}
                  component={<Link to="/admin/blog" />}
                >
                  {" "}
                  Blog
                </MenuItem>
                <MenuItem
                  icon={<FaTags />}
                  component={<Link to="/admin/category" />}
                >
                  {" "}
                  Danh mục
                </MenuItem>
                <MenuItem
                  icon={<IoMdColorPalette />}
                  component={<Link to="/admin/color" />}
                >
                  {" "}
                  Màu sắc
                </MenuItem>
                <MenuItem
                  icon={<HiOfficeBuilding />}
                  component={<Link to="/admin/branch" />}
                >
                  {" "}
                  Chi nhánh
                </MenuItem>
              </>
            )}
          </SubMenu>
          <MenuItem icon={<CiLogout />} onClick={() => handleShow()}>
            {" "}
            Đăng xuất{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
      <LogoutModal show={showModal} handleClose={handleClose} />
    </>
  );
};
export default SideBar;
