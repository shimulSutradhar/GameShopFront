import React, { useState } from 'react';
// import imageUploader from '../../../pages/api/services/FileUpload';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ImageHandlerProps {
    keyName: string;
    index: number;
    id: string;
    games: any
    setGames: React.Dispatch<React.SetStateAction<any[]>>;
}

const ImageHandler: React.FC<ImageHandlerProps> = ({ keyName, index, id, games, setGames }) => {
    const [open, setOpen] = useState(false);
    const [tempImageUrl, setTempImageUrl] = useState<string>(games[index][keyName]);
    const [fileName, setFileName] = useState<string>("temp");
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [imageData, setImageData] = useState<any>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setTempImageUrl(games[index][keyName]);
        }, 1000);
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (!file) {
            return false;
        }
        if (file.size / 1024 / 1024 >= 5) {
            alert("File size should be less than 5MB!");
            return false;
        }

        const formData = new FormData();
        formData.append("image", file);
        setImageData(formData);

        file?.arrayBuffer().then(async (arrayBuffer: ArrayBuffer) => {
            const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
            const url = URL.createObjectURL(blob);
            setTempImageUrl(url);
        });
    };

    const handleUpload = async () => {
        setIsUploading(true);
        try {
            const response = await fetch('/api/ImageUpload', {
                method: 'POST',
                body: imageData,
            });
            if (response.ok) {
                const data = await response.json();
                const protocol = window.location.protocol;
                const hostAddress = `${protocol}//${window.location.hostname}/api/public/games`;
                const serverImageURLWithHostName = hostAddress + data.newImage.newFilename;
                setTempImageUrl(serverImageURLWithHostName);
            } else {
                console.error("Failed to upload image.");
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setIsUploading(false); // Reset uploading state
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen}>
                <Image
                    src={tempImageUrl}
                    alt="Game Thumbnail"
                    width={40}
                    height={100}
                />
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
                    <Image
                        src={tempImageUrl}
                        alt="Game Thumbnail"
                        width={400}
                        height={400}
                    />
                    <div style={{
                        marginTop: "10px",
                    }}>
                        <div>Replace {keyName}: </div>
                        <div style={{
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            borderRadius: "10px",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                    <Button onClick={handleUpload} autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ImageHandler;