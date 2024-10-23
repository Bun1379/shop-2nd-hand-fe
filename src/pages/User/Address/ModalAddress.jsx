import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
import { toast } from "react-toastify";
import AddressAPI from "../../../api/AddressAPI";

const AddressModal = ({ show, handleClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        phone: initialData?.phone || '',
        city: null,
        district: null,
        ward: null,
        address: initialData?.address || '',
    });

    const [locations, setLocations] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^(0[3|5|7|8|9]\d{8})$/;
        return phoneRegex.test(phone);
    };

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
            .then((response) => response.json())
            .then((data) => setLocations(data));
    }, []);

    useEffect(() => {
        if (formData.city) {
            const selectedCity = locations.find(city => city.Name === formData.city);
            setDistricts(selectedCity?.Districts || []);
        } else {
            setDistricts([]);
        }
    }, [formData.city, locations]);

    useEffect(() => {
        if (formData.district) {
            const selectedDistrict = districts.find(district => district.Name === formData.district);
            setWards(selectedDistrict?.Wards || []);
        } else {
            setWards([]);
        }
    }, [formData.district, districts]);

    const handleChange = (selectedOption, name) => {
        setFormData({ ...formData, [name]: selectedOption.value }); // Chỉ lưu value
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidPhoneNumber(formData.phone)) {
            toast.error("Số điện thoại không hợp lệ!");
            return;
        }
        const exists = await AddressAPI.CheckAddress(formData.city, formData.district, formData.ward, formData.address);
        if (exists) {
            onSave(formData);
            // toast.success("Địa chỉ tồn tại !");
        }
        else {
            toast.error("Địa chỉ không tồn tại !");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? "Sửa địa chỉ" : "Thêm địa chỉ"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên người nhận</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label>Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />
                    </div>
                    <div className="row mt-2">
                        <div className="col-4">
                            <label>Thành phố</label>
                            <Select
                                options={locations.map(city => ({ value: city.Name, label: city.Name }))}
                                value={formData.city ? { value: formData.city, label: formData.city } : null}
                                onChange={(option) => handleChange(option, 'city')}
                                placeholder="Chọn thành phố"
                                components={{ DropdownIndicator: () => <FaCaretDown /> }}
                                required
                            />
                        </div>
                        <div className="col-4">
                            <label>Quận/Huyện</label>
                            <Select
                                options={districts.map(district => ({ value: district.Name, label: district.Name }))}
                                value={formData.district ? { value: formData.district, label: formData.district } : null}
                                onChange={(option) => handleChange(option, 'district')}
                                placeholder="Chọn quận/huyện"
                                components={{ DropdownIndicator: () => <FaCaretDown /> }}
                                required
                            />
                        </div>
                        <div className="col-4">
                            <label>Phường/Xã</label>
                            <Select
                                options={wards.map(ward => ({ value: ward.Name, label: ward.Name }))}
                                value={formData.ward ? { value: formData.ward, label: formData.ward } : null}
                                onChange={(option) => handleChange(option, 'ward')}
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
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                        />
                    </div>
                    <Button className="mt-2" variant="primary" type="submit">
                        Lưu
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddressModal;