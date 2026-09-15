import { useEffect, useMemo, useState } from "react";
import {
    Stack, Typography,
    ToggleButton, ToggleButtonGroup, Box, IconButton, Tooltip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import EventIcon from "@mui/icons-material/Event";
import SearchCards from "../SearchCards/SearchCards";
import EntityCard from "../EntityCard/EntityCard";
import PaginationCustom from "../PaginationCustom/PaginationCustom";
import { TASK_STATUSES, TASK_PRIORITIES } from "../../pages/Profile/constants";
import { emptyTask, TASK_FIELDS } from "../../pages/Profile/fields/taskFieldsShema";
import { openPopup, closePopup } from "../../services/actions/popupData";
import FormDialogCard from "../FormDialogCard/FormDialogCard";
import ModalConfirmation from "../ModalConfirmation/ModalConfirmation";

export default function TasksTab({
    user = {},
    editable = false,
    saveEdit,
    updateUser,
}) {
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [tasks, setTasks] = useState([]);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const dispatch = useDispatch();

    // синхронизация с user.tasks
    useEffect(() => {
        setTasks(user.tasks ?? []);
    }, [user]);

    // фильтрация
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return tasks.filter((t) => {
            if (statusFilter !== "all" && t.status !== statusFilter) return false;
            if (!q) return true;
            return (
                t.title?.toLowerCase().includes(q) ||
                t.description?.toLowerCase().includes(q) ||
                t.assignee?.toLowerCase().includes(q) ||
                t.tags?.some((tag) => tag.toLowerCase().includes(q))
            );
        });
    }, [tasks, query, statusFilter]);

    // постраничный срез
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const pageItems = useMemo(() => {
        const start = (page - 1) * perPage;
        return filtered.slice(start, start + perPage);
    }, [filtered, page, perPage]);

    // сбрасываем страницу при смене фильтра/поиска/размера
    useEffect(() => {
        setPage(1);
    }, [query, statusFilter, perPage]);

    // если после удаления страниц стало меньше — вернуть на последнюю
    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    // счётчики по статусам
    const counts = useMemo(() => {
        const c = { all: tasks.length };
        Object.keys(TASK_STATUSES).forEach((s) => {
            c[s] = tasks.filter((t) => t.status === s).length;
        });
        return c;
    }, [tasks]);

    const openEdit = (task) => {
        dispatch(
            openPopup(FormDialogCard, {
                activeElement: task,
                FIELDS: TASK_FIELDS,
                errors: {},
                handleSave: (el) => saveEdit(el, "tasks"),
            })
        );
    };

    const removeTask = (id) => {
        dispatch(
            openPopup(ModalConfirmation, {
                title: "Подтвердите удаление",
                question: `Удалить задачу?`,
                handleClickButton: () => {
                    updateUser({
                        ...user,
                        tasks: (user.tasks ?? []).filter((ts) => ts.id !== id),
                    });
                    dispatch(closePopup());
                },
            })
        );
    };

    return (
        <Box>
            <SearchCards
                query={query}
                setQuery={setQuery}
                editable={editable}
                openCreate={() => openEdit(emptyTask())}
            />

            {/* Фильтр по статусам */}
            <ToggleButtonGroup
                size="small"
                exclusive
                value={statusFilter}
                onChange={(_, v) => v && setStatusFilter(v)}
                sx={{ mb: 3, flexWrap: "wrap" }}
            >
                <ToggleButton value="all">Все ({counts.all})</ToggleButton>
                {Object.entries(TASK_STATUSES).map(([key, s]) => (
                    <ToggleButton key={key} value={key}>
                        {s.label} ({counts[key] ?? 0})
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            {/* Список задач — только текущая страница */}
            {pageItems.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
                    Задачи не найдены
                </Typography>
            ) : (
                <Stack spacing={2}>
                    {pageItems.map((task) => {
                        const status = TASK_STATUSES[task.status] ?? { label: "—", color: "default" };
                        const priority = TASK_PRIORITIES[task.priority] ?? { label: "—", color: "default" };

                        return (
                            <EntityCard
                                key={task.id}
                                title={task.title}
                                description={task.description}
                                statusChip={status}
                                tags={task.tags}
                                rows={[
                                    {
                                        key: "priority",
                                        icon: FlagIcon,
                                        label: "Приоритет",
                                        value: { label: priority.label, color: priority.color, variant: "outlined" },
                                    },
                                    {
                                        key: "due_date",
                                        icon: EventIcon,
                                        label: "Срок",
                                        value: task.due_date,
                                    },
                                ]}
                                actions={
                                    editable ? (
                                        <Stack direction="row" spacing={0.5}>
                                            <Tooltip title="Редактировать">
                                                <IconButton size="small" onClick={() => openEdit(task)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Удалить">
                                                <IconButton size="small" color="error" onClick={() => removeTask(task.id)}>
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

            {/* Пагинация */}
            {filtered.length > 0 && (
                <PaginationCustom
                    perPage={perPage}
                    setPerPage={setPerPage}
                    pageItems={pageItems}
                    filtered={filtered}
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            )}
        </Box>
    );
}