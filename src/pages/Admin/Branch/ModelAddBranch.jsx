import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from "react-select";
import { FaCaretDown } from "react-icons/fa";
import { toast } from "react-toastify";
import BranchAPI from "../../../api/BranchAPI";
import AddressAPI from "../../../api/AddressAPI";
import DGHC from "../../../assets/DGHC.json";

const ModelAddBranch = ({ show, setShow, selectedBranch, fetchDataBranch }) => {
  const [formData, setFormData] = useState({});
  const [locations, setLocations] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  useEffect(() => {
    setLocations(DGHC);
  }, []);

  useEffect(() => {
    if (formData.city) {
      const selectedCity = locations.find(
        (city) => city.name === formData.city
      );
      setDistricts(selectedCity?.districts || []);
    } else {
      setDistricts([]);
    }
  }, [formData.city, locations]);

  useEffect(() => {
    if (formData.district) {
      const selectedDistrict = districts.find(
        (district) => district.name === formData.district
      );
      setWards(selectedDistrict?.wards || []);
    } else {
      setWards([]);
    }
  }, [formData.district, districts]);

  const handleChange = (selectedOption, name) => {
    setFormData({ ...formData, [name]: selectedOption?.value || null });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = async () => {
    const exists = await AddressAPI.CheckAddress(
      formData.city,
      formData.district,
      formData.ward,
      formData.address
    );
    if (!exists) {
      toast.error("Địa chỉ không hợp lệ!");
      return;
    }

    try {
      let response;
      if (selectedBranch) {
        response = await BranchAPI.updateBranch(selectedBranch._id, {
          name: formData.name,
          address: `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.city}`,
        });
      } else {
        response = await BranchAPI.addBranch({
          name: formData.name,
          address: `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.city}`,
        });
      }

      if (response.status === 200) {
        toast.success(
          selectedBranch
            ? "Cập nhật chi nhánh thành công"
            : "Thêm chi nhánh thành công"
        );
        fetchDataBranch();
        handleClose();
      }
    } catch (error) {
      toast.error(
        selectedBranch
          ? "Cập nhật chi nhánh thất bại"
          : "Thêm chi nhánh thất bại"
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedBranch ? "Cập nhật chi nhánh" : "Thêm chi nhánh"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="form-group mt-2">
            <label>Tên chi nhánh</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="row mt-2">
            <div className="col-4">
              <label>Thành phố</label>
              <Select
                options={locations.map((city) => ({
                  value: city.name,
                  label: city.name,
                }))}
                value={
                  formData.city
                    ? { value: formData.city, label: formData.city }
                    : null
                }
                onChange={(option) => handleChange(option, "city")}
                placeholder="Chọn thành phố"
                components={{ DropdownIndicator: () => <FaCaretDown /> }}
                required
              />
            </div>
            <div className="col-4">
              <label>Quận/Huyện</label>
              <Select
                options={districts.map((district) => ({
                  value: district.name,
                  label: district.name,
                }))}
                value={
                  formData.district
                    ? { value: formData.district, label: formData.district }
                    : null
                }
                onChange={(option) => handleChange(option, "district")}
                placeholder="Chọn quận/huyện"
                components={{ DropdownIndicator: () => <FaCaretDown /> }}
                required
              />
            </div>
            <div className="col-4">
              <label>Phường/Xã</label>
              <Select
                options={wards.map((ward) => ({
                  value: ward.name,
                  label: ward.name,
                }))}
                value={
                  formData.ward
                    ? { value: formData.ward, label: formData.ward }
                    : null
                }
                onChange={(option) => handleChange(option, "ward")}
                placeholder="Chọn phường/xã"
                components={{ DropdownIndicator: () => <FaCaretDown /> }}
                required
              />
            </div>
          </div>
          <div className="form-group mt-2">
            <label>Địa chỉ cụ thể</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModelAddBranch;
