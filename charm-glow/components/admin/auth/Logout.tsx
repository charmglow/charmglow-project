'use client'
import { useState } from 'react';
import { Modal } from 'antd';

const Logout: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};

export default Logout;