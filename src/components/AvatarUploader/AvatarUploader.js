import { useState, useRef } from "react";
import { Box, Typography, Button, Avatar, LinearProgress } from "@mui/material";
import {
    PhotoCamera as PhotoCameraIcon,
    Upload as UploadIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";
import styles from "./AvatarUploader.module.css";

const MAX_MB = 5;
const ACCEPTED = ["image/png", "image/jpeg", "image/webp", "image/gif"];

function AvatarUploader({ value, onChange, name = "" }) {
    const [drag, setDrag] = useState(false);
    const [busy, setBusy] = useState(false);
    const inputRef = useRef(null);

    const handleFile = (file) => {
        if (!file) return;
        if (!ACCEPTED.includes(file.type)) {
            alert("Только PNG / JPEG / WebP / GIF");
            return;
        }
        if (file.size > MAX_MB * 1024 * 1024) {
            alert(`Файл больше ${MAX_MB} МБ`);
            return;
        }
        setBusy(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            onChange(e.target.result);
            setBusy(false);
        };
        reader.onerror = () => setBusy(false);
        reader.readAsDataURL(file);
    };

    const onPick = (e) => {
        handleFile(e.target.files?.[0]);
        e.target.value = "";
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDrag(false);
        handleFile(e.dataTransfer.files?.[0]);
    };

    const initials = name
        .split(" ")
        .filter(Boolean)
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <Box>
            <div
                className={`${styles.root} ${drag ? styles.drag : ""}`}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={onDrop}
            >
                {value ? (
                    <img className={styles.img} src={value} alt={name} />
                ) : (
                    <Avatar className={styles.fallbackAvatar}>
                        {initials || "?"}
                    </Avatar>
                )}

                {busy && <LinearProgress className={styles.progress} />}

                <div className={styles.overlay}>
                    <PhotoCameraIcon />
                    <Typography variant="caption">
                        Нажмите или перетащите фото
                    </Typography>
                </div>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={onPick}
            />

            <div className={styles.actions}>
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<UploadIcon />}
                    onClick={() => inputRef.current?.click()}
                >
                    Загрузить
                </Button>
                {value && (
                    <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => onChange("")}
                    >
                        Удалить
                    </Button>
                )}
            </div>
        </Box>
    );
}

export default AvatarUploader;