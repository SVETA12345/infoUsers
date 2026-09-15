import { useEffect, useState } from "react";
import {
    Stack, Typography, Box, IconButton, Tooltip, Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import EventIcon from "@mui/icons-material/Event";
import { useDispatch } from "react-redux";
import EntityCard from "../EntityCard/EntityCard";
import ModalConfirmation from "../ModalConfirmation/ModalConfirmation";
import { openPopup, closePopup } from "../../services/actions/popupData";
import { emptyPreviousPosition, PREVIOUS_POSITION_FIELDS } from "../../pages/Profile/fields/previousPositionFieldsShema";

import FormDialogCard from '../FormDialogCard/FormDialogCard'
import { DEPARTAMENTS_DATA } from "../../constantsData";

export default function PreviousPositionsTab({
    user = {},
    editable = false,
    saveEdit,
    updateUser,
}) {
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setItems(user.previous_positions ?? []);
    }, [user]);

    const openEdit = (item) => {

        dispatch(
            openPopup(FormDialogCard, {
                activeElement: item,
                FIELDS: PREVIOUS_POSITION_FIELDS,
                errors: {},
                handleSave: (el) => saveEdit(el, "previous_positions"),
            })
        );
    };

    const removeItem = (id) => {
        dispatch(
            openPopup(ModalConfirmation, {
                title: "Подтвердите удаление",
                question: "Удалить место работы?",
                handleClickButton: () => {
                    updateUser({
                        ...user,
                        previous_positions: (user.previous_positions ?? []).filter(
                            (x) => x.id !== id
                        ),
                    });
                    dispatch(closePopup());
                },
            })
        );
    };

    return (
        <Box>
            {editable && (
                <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => openEdit(emptyPreviousPosition())}
                    >
                        Добавить место работы
                    </Button>
                </Stack>
            )}

            {items.length === 0 ? (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center", py: 4 }}
                >
                    Нет данных о предыдущих местах работы
                </Typography>
            ) : (
                <Stack spacing={2}>
                    {items.map((item) => {
                        const dep = DEPARTAMENTS_DATA[item.department_id];

                        return (
                            <EntityCard
                                key={item.id}
                                title={item.position || "—"}
                                rows={[
                                    {
                                        key: "department",
                                        icon: BusinessIcon,
                                        label: "Отдел",
                                        value: {
                                            label: dep?.name ?? "—",
                                            variant: "outlined",
                                        },
                                    },
                                    {
                                        key: "period",
                                        icon: EventIcon,
                                        label: "Период",
                                        value: `${item.year_start_work} – ${item.year_end_work}`,
                                    },
                                ]}
                                actions={
                                    editable ? (
                                        <Stack direction="row" spacing={0.5}>
                                            <Tooltip title="Редактировать">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => openEdit(item)}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Удалить">
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    ) : null
                                }
                            />
                        );
                    })}
                </Stack>
            )}
        </Box>
    );
}