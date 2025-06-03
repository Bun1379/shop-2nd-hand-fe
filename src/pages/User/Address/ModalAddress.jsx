import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
import { toast } from "react-toastify";
import DGHC from "../../../assets/DGHC.json";
import Map from "../../../components/Map/Map";

const AddressModal = ({ show, handleClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            name: initialData?.name || '',
            phone: initialData?.phone || '',
            city: initialData?.city || null,
            district: initialData?.district || null,
            ward: initialData?.ward || null,
            address: initialData?.address || '',
        });
    }, [show, handleClose, initialData]);

    const [locations, setLocations] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^(0[3|5|7|8|9]\d{8})$/;
        return phoneRegex.test(phone);
    };

    useEffect(() => {
        setLocations(DGHC);
    }, []);

    useEffect(() => {
        const selectedCity = locations.find(city => city.name.includes(formData.city));
        if (selectedCity && selectedCity.name !== formData.city) {
            setFormData(prev => ({ ...prev, city: selectedCity.name }));
        }
        setDistricts(selectedCity?.districts || []);
    }, [formData.city, locations]);

    useEffect(() => {
        const selectedDistrict = districts.find(district => district.name.includes(formData.district));
        if (selectedDistrict && selectedDistrict.name !== formData.district) {
            setFormData(prev => ({ ...prev, district: selectedDistrict.name }));
        }
        setWards(selectedDistrict?.wards || []);
    }, [formData.district, districts]);

    useEffect(() => {
        const selectedWard = wards.find(ward => ward.name.includes(formData.ward));
        if (selectedWard && selectedWard.name !== formData.ward) {
            setFormData(prev => ({ ...prev, ward: selectedWard.name }));
        }
    }, [formData.ward, wards]);


    const handleChange = (selectedOption, name) => {
        setFormData({ ...formData, [name]: selectedOption?.value || null }); // Chỉ lưu value
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidPhoneNumber(formData.phone)) {
            toast.error("Số điện thoại không hợp lệ!");
            return;
        }
        onSave(formData);
    };

    // console.log("formData", formData);

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
                                options={locations.map(city => ({ value: city.name, label: city.name }))}
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
                                options={districts.map(district => ({ value: district.name, label: district.name }))}
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
                                options={wards.map(ward => ({ value: ward.name, label: ward.name }))}
                                value={formData.ward ? { value: formData.ward, label: formData.ward } : null}
                                onChange={(option) => handleChange(option, 'ward')}
                                placeholder="Chọn phường/xã"
                                components={{ DropdownIndicator: () => <FaCaretDown /> }}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group mt-2 mb-3">
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

                    <Map
                        formData={formData}
                        setFormData={setFormData}
                    />

                    <Button className="mt-2" variant="primary" type="submit">
                        Lưu
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddressModal;
