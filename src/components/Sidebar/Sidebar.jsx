import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaTachometerAlt, FaUserCog, FaBox, FaHome } from "react-icons/fa";
import { CiBoxList, CiLogout } from "react-icons/ci";
import { GiClothes } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { RiCoupon2Fill } from "react-icons/ri";

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
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
            Shop 2nd Hand
          </MenuItem>
          <MenuItem icon={<FaTachometerAlt />} component={<Link to="/admin" />}>
            {" "}
            Thống kê
          </MenuItem>
          <SubMenu label="Quản lý" icon={<CiBoxList />}>
            <MenuItem
              icon={<GiClothes />}
              component={<Link to="/admin/product" />}
            >
              {" "}
              Sản phẩm
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
          </SubMenu>
          <MenuItem icon={<CiLogout />} onClick={() => navigate("/login")}>
            {" "}
            Đăng xuất{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};
export default SideBar;
