import React, { useState } from 'react';
// import imageUploader from '../../../pages/api/services/FileUpload';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const ImportNewRow: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>('https://thesis-gamestopre.nyc3.digitaloceanspaces.com/edit.png');
    const [category, setCategory] = useState<string>('Action');
    const [keyFeatures, setKeyFeatures] = useState<string>('');
    const [brandName, setBrandName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = async () => {
        try {
            const response = await fetch('/api/add_product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Add Content-Type header
                },
                body: JSON.stringify({
                    name: name,
                    price: price,
                    image: image,
                    catagory: category, // Match spelling to backend (category -> catagory)
                    key_features: keyFeatures,
                    brand_name: brandName,
                    description: description,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to upload product');
            }
    
            const data = await response.json();
            console.log('Upload successful:', data);
            setOpen(false);
        } catch (error) {
            console.error('Error uploading product:', error);
        }
    }

    const handleImageChange = async (e: any) => {
        const file = e.target.files[0];
        if (!file) {
            return false;
        }
        if (file.size / 1024 / 1024 >= 5) {
            alert("File size should be less than 5MB!");
            return false;
        }

        const fileExtension = file.name.split('.').pop();
        const randomFileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExtension}`;

        const formData = new FormData();
        formData.append('file', new File([file], randomFileName, { type: file.type }));

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        setImage(`https://thesis-gamestopre.nyc3.digitaloceanspaces.com/${randomFileName}`);
    };

    return (
        <React.Fragment>
            <Button className='border' onClick={handleClickOpen}>
                Add Data
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add New Row"}
                </DialogTitle>
                <DialogContent>
                    <div className='flex'>
                        <div className='w-[100px]'>Name: </div>
                        <input
                            type="text"
                            name="file"
                            id="file"
                            value={name}
                            onChange={(event: any) => setName(event.target.value)}
                            className='border'
                        />
                    </div>
                    <div className='flex mt-2'>
                        <div className='w-[100px]'>Price: </div>
                        <input
                            type="number"
                            value={price}
                            onChange={(event: any) => setPrice(event.target.value)}
                            className='border'
                        />
                    </div>
                    <div className='flex mt-2'>
                        <div className='w-[100px]'>image: </div>
                        <Image
                            className='mr-2'
                            src={image}
                            alt="Game Thumbnail"
                            width={30}
                            height={20}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    <div className='flex mt-2'>
                        <div className='w-[100px]'>Category: </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="Action"
                                    name="category"
                                    onChange={(event: any) => setCategory(event.target.value)}
                                />
                                Action
                            </label>
                            <label className='ml-2'>
                                <input
                                    type="radio"
                                    value="Adventure"
                                    name="category"
                                    onChange={(event: any) => setCategory(event.target.value)}
                                />
                                Adventure
                            </label>
                            <label className='ml-2'>
                                <input
                                    type="radio"
                                    value="Horror"
                                    name="category"
                                    onChange={(event: any) => setCategory(event.target.value)}
                                />
                                Horror
                            </label>
                        </div>
                    </div>

                    <div className='flex mt-2'>
                        <div className='w-[100px]'>Price: </div>
                        <input
                            type="text"
                            value={keyFeatures}
                            onChange={(event: any) => setKeyFeatures(event.target.value)}
                            className='border'
                        />
                    </div>

                    <div className='flex mt-2'>
                        <div className='w-[100px]'>Price: </div>
                        <input
                            type="text"
                            value={brandName}
                            onChange={(event: any) => setBrandName(event.target.value)}
                            className='border'
                        />
                    </div>

                    <div className='flex mt-2'>
                        <div className='w-[100px]'>Price: </div>
                        <input
                            type="text"
                            value={description}
                            onChange={(event: any) => setDescription(event.target.value)}
                            className='border'
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                    <Button onClick={handleUpload} autoFocus>
                        Insert
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ImportNewRow;