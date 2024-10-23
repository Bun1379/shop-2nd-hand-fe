import React from 'react';
import { Modal, Button, Row, Col } from "react-bootstrap";
import './ModalSelectAddress.css';

const ModalSelectAddress = ({ isOpen, onRequestClose, addresses, selectedAddress, setSelectedAddress }) => {
    return (
        <Modal show={isOpen} onHide={onRequestClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chọn Địa Chỉ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {addresses.map((address) => (
                        <Col md={6} key={address._id}>
                            <div className="select-address card position-relative">
                                {address.isDefault && (
                                    <span className="position-absolute top-0 end-0 badge bg-danger text-light" style={{ margin: '17px' }}>
                                        Mặc định
                                    </span>
                                )}
                                <div className="card-body" onClick={() => {
                                    setSelectedAddress(address);
                                    onRequestClose();
                                }}>
                                    <h5 className="card-title">{address.name}</h5>
                                    <p className="card-text">
                                        Số điện thoại: {address.phone}<br />
                                        Địa chỉ: {address.address}, {address.district}, {address.ward}, {address.city}
                                    </p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ModalSelectAddress;
