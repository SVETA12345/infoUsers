import {
    DialogTitle, DialogContent,
    Stack, TextField, MenuItem, DialogActions, Button
} from "@mui/material";
import { closePopup } from '../../services/actions/popupData';
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function FormDialogCard({ activeElement, FIELDS, errors, handleSave }) {
    const [formDialog, setFormDialog] = useState(activeElement)
    const dispatch = useDispatch()
    return (
        <>
            <DialogTitle>
                {activeElement?.title ? "Редактирование" : "Добавление"}
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    {FIELDS.map((f) => {
                        const value = formDialog?.[f.key] ?? "";
                        return (
                            <TextField
                                key={f.key}
                                label={f.label}
                                type={f.type ?? "text"}
                                multiline={Boolean(f.multiline)}
                                rows={f.rows}
                                select={Boolean(f.options)}
                                size="small"
                                fullWidth
                                value={value}
                                error={Boolean(errors[f.key])}
                                helperText={errors[f.key] || " "}
                                InputLabelProps={f.type === "date" ? { shrink: true } : undefined}
                                onChange={(e) => setFormDialog({ ...formDialog, [f.key]: e.target.value })
                                }
                            >
                                {f.options?.map((o) => (
                                    <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                                ))}
                            </TextField>
                        );
                    })}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => dispatch(closePopup())} color="inherit">Отмена</Button>
                <Button onClick={(e) => handleSave(formDialog)} variant="contained">Применить</Button>
            </DialogActions>
        </>

    )
}