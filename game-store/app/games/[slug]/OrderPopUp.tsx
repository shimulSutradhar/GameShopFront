import React, { useState } from 'react';
// import imageUploader from '../../../pages/api/services/FileUpload';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

interface OrderPopUpProps {
    id: string;
}

const OrderPopUp: React.FC<OrderPopUpProps> = ({ id }) => {
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState('');
                    const [phoneNumber, setPhoneNumber] = useState('');
                    const [address, setAddress] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = async () => {
        const response = await fetch('/api/add_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: quantity,
                phoneNumber: phoneNumber,
                address: address,
                prioduct_id: id,
                userid: localStorage.getItem('userId')
            }),
        });
        
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen}>
            <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
                                Buy Now
                            </button>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Image Update"}
                </DialogTitle>
                <DialogContent>
                        <div className="space-y-4">
                            <TextField
                                label="Quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                fullWidth
                                variant="outlined"
                                className="mt-2"
                            />
                            <TextField
                                label="Phone Number"
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                fullWidth
                                variant="outlined"
                                className="mt-2"
                            />
                            <TextField
                                label="Address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                fullWidth
                                variant="outlined"
                                className="mt-2"
                            />
                        </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                    <Button onClick={handleUpload} autoFocus>
                        Order
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default OrderPopUp;