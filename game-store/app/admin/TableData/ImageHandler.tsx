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

        setTempImageUrl(`https://thesis-gamestopre.nyc3.digitaloceanspaces.com/${randomFileName}`);
    };

    const handleUpload = async () => {
        const response = await fetch('/api/updateGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: keyName,
                value: tempImageUrl,
                _id: id,
            }),
        });
        
        const updatedGames = games.map((game:any) => {
            if (game._id.$oid === id) {
                return { ...game, [keyName]: tempImageUrl };
            }
            return game;
        });

        setGames(updatedGames)
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