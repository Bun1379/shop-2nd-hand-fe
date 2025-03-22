import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaTachometerAlt, FaUserCog, FaBox, FaHome } from "react-icons/fa";
import { CiBoxList, CiLogout } from "react-icons/ci";
import { GiClothes } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { RiCoupon2Fill } from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";
import { IoMdColorPalette } from "react-icons/io";
import LogoutModal from "../LogoutModal/LogoutModal";
import { useState } from "react";

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true); // Mở modal
  const handleClose = () => setShowModal(false); // Đóng modal
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
          <MenuItem icon={<FaTachometerAlt />} component={<Link to="/admin" />}>
            {" "}
            Thống kê
          </MenuItem>
          <SubMenu label="Quản lý" icon={<CiBoxList />}>
            <MenuItem icon={<FaHome />} component={<Link to="/admin/banner" />}>
              {" "}
              Banner
            </MenuItem>
            <MenuItem
              icon={<GiClothes />}
              component={<Link to="/admin/product" />}
            >
              {" "}
              Sản phẩm
            </MenuItem>
            <MenuItem
              icon={<GiClothes />}
              component={<Link to="/admin/branch-stock-request" />}
            >
              {" "}
              Yêu cầu nhập hàng
            </MenuItem>

            <MenuItem
              icon={<FaUserCog />}
              component={<Link to="/admin/user" />}
            >
              {" "}
              Người dùng
            </MenuItem>
            <MenuItem icon={<FaBox />} component={<Link to="/admin/order" />}>
              {" "}
              Đơn hàng
            </MenuItem>
            <MenuItem
              icon={<RiCoupon2Fill />}
              component={<Link to="/admin/discount" />}
            >
              {" "}
              Mã giảm giá
            </MenuItem>
            <MenuItem
              icon={<CiBoxList />}
              component={<Link to="/admin/cancel-request" />}
            >
              {" "}
              Yêu cầu hủy đơn
            </MenuItem>
            <MenuItem
              icon={<TbCategoryPlus />}
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
              icon={<IoMdColorPalette />}
              component={<Link to="/admin/branch" />}
            >
              {" "}
              Chi nhánh
            </MenuItem>
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
