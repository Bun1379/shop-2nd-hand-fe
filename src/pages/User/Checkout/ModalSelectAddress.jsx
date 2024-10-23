import React from 'react';
import { Modal, Button, Form } from "react-bootstrap";

const ModalSelectAddress = ({ isOpen, onRequestClose, addresses, selectedAddress, setSelectedAddress }) => {
    return (
        <Modal show={isOpen} onHide={onRequestClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chọn Địa Chỉ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    {addresses.map((address) => (
                        <div key={address._id} className="col-6 mb-3">
                            <div className="card" onClick={() => {
                                setSelectedAddress(address);
                                onRequestClose();
                            }}>
                                <div className="card-body">
                                    <h5 className="card-title">{address.name}</h5>
                                    <p className="card-text">Số điện thoại: {address.phone}</p>
                                    <p className="card-text">Địa chỉ: {address.address}, {address.district}, {address.ward}, {address.city}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalSelectAddress;
