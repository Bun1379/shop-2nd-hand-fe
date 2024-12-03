import { useEffect, useState } from "react";
import ModalAddBanner from "./ModalAddBanner";
import BannerAPI from "../../../api/BannerAPI";
import BannerTable from "./BannerTable";
import ModalUpdateBanner from "./ModalUpdateBanner";
import { toast } from "react-toastify";

const ManageBanner = () => {
  const [showAddBanner, setShowAddBanner] = useState(false);
  const [bannerUpdate, setBannerUpdate] = useState({});
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [banners, setBanners] = useState([]);

  const handleUpdateBanner = (banner) => {
    setBannerUpdate(banner);
    setShowUpdateBanner(true);
  };

  const handleDeleteBanner = async (id) => {
    try {
      const res = await BannerAPI.DeleteBanner(id);
      if (res.status === 200) {
        toast.success("Xóa banner thành công");
        fetchDataBanner();
      }
    } catch (err) {
      toast.error(err.response?.data?.EM || "Có lỗi xảy ra");
      console.log(err);
    }
  };

  const fetchDataBanner = async () => {
    try {
      const res = await BannerAPI.GetBanners();
      if (res.status === 200) {
        setBanners(res.data.DT);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataBanner();
  }, []);

  return (
    <div className="p-4">
      <h1>Quản lý Banner</h1>
      <hr />
      <button
        className="btn btn-primary"
        onClick={() => setShowAddBanner(true)}
      >
        Thêm banner
      </button>
      <BannerTable
        banners={banners}
        handleUpdateBanner={handleUpdateBanner}
        handleDeleteBanner={handleDeleteBanner}
      />
      <ModalAddBanner
        showAdd={showAddBanner}
        setShowAdd={setShowAddBanner}
        fetchDataBanner={fetchDataBanner}
      />
      <ModalUpdateBanner
        showUpdate={showUpdateBanner}
        setShowUpdate={setShowUpdateBanner}
        dataUpdate={bannerUpdate}
        fetchDataBanner={fetchDataBanner}
      />
    </div>
  );
};

export default ManageBanner;