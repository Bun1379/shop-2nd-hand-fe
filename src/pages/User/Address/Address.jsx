import React, { useState, useEffect } from "react";
import AddressAPI from "../../../api/AddressAPI";
import ModalAddress from "./ModalAddress";
import { Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import ModalConfirm from "../../../components/ConfirmModal/ConfirmModal";

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            const response = await AddressAPI.GetAddressByUser();
            if (response.status === 200)
                setAddresses(response.data.DT);
        }
        catch (error) {
            toast.error("Lỗi khi lấy địa chỉ: " + error.response.data.EM);
        }
    };

    const openModal = (address = null) => {
        setCurrentAddress(address);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentAddress(null);
    };

    const openConfirm = (address = null) => {
        setCurrentAddress(address);
        setShowConfirm(true);
    }

    const closeConfirm = () => {
        setShowConfirm(false);
        setCurrentAddress(null);
    };


    const handleSave = async (addressData) => {
        try {
            if (currentAddress) {
                await AddressAPI.UpdateAddress(currentAddress._id, addressData);
            } else {
                await AddressAPI.CreateAddress(addressData);
            }
            toast.success("Lưu địa chỉ thành công !");
        } catch (error) {
            toast.error("Lỗi khi lưu: " + error.response.data.EM);
        }
        closeModal();
        loadAddresses();
    };

    const handleDelete = async (id) => {
        try {
            await AddressAPI.DeleteAddress(id);
            loadAddresses();
            toast.success("Xóa địa chỉ thành công !");
        } catch (error) {
            toast.error("Lỗi khi xóa: " + error.response.data.EM);
        }
    };

    const handleSetDefault = async (id) => {
        try {
            await AddressAPI.SetDefaultAddress(id);
            loadAddresses();
            toast.success("Đặt địa chỉ mặc định thành công !");
        } catch (error) {
            toast.error("Lỗi khi đặt mặc định: " + error.response.data.EM);
        }
    }

    return (
        <div className="container">
            <h3 className="text-center">Danh sách địa chỉ</h3>
            <Button variant="primary" onClick={() => openModal()}>Thêm địa chỉ</Button>
            <Row>
                {addresses.map((address) => (
                    <Col md={6} key={address._id} className="mt-3">
                        <div className="card position-relative">
                            {address.isDefault && (
                                <span className="position-absolute top-0 end-0 badge bg-danger text-light" style={{ margin: '17px' }}>
                                    Mặc định
                                </span>
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{address.name}</h5>
                                <p className="card-text mt-1">
                                    Số điện thoại: {address.phone}<br />
                                    Địa chỉ: {address.address}, {address.district}, {address.ward}, {address.city}
                                </p>
                                <div className="d-flex gap-2">
                                    <Button variant="warning" onClick={() => openModal(address)}>Cập Nhật</Button>
                                    {!address.isDefault && (
                                        <Button variant="danger" onClick={() => openConfirm(address)}>Xóa</Button>
                                    )}
                                    <Button
                                        variant="info"
                                        onClick={() => handleSetDefault(address._id)}
                                        disabled={address.isDefault}
                                    >
                                        Đặt làm mặc định
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
            <ModalAddress
                show={showModal}
                handleClose={closeModal}
                onSave={handleSave}
                initialData={currentAddress}
            />
            <ModalConfirm
                show={showConfirm}
                onClose={() => closeConfirm()}
                onConfirm={() => {
                    handleDelete(currentAddress._id);
                    setShowConfirm(false);
                }}
                text="Bạn có chắc chắn muốn xóa địa chỉ này không?"
            />
        </div>
    );
};

export default Address;
