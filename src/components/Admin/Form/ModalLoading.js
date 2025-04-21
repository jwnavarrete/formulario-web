import React, { useContext } from "react"
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingModal = ({ contexto }) => {
    const { modalLoading } = useContext(contexto);

    return (
        <Modal
            open={modalLoading}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div>
                <CircularProgress color="primary" size={60} thickness={4} />
            </div>
        </Modal>
    );
};

export default LoadingModal;
