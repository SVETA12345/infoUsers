
import { TASK_STATUSES, TASK_PRIORITIES } from "../constants";

export const TASK_FIELDS = [
    { key: "title", label: "Название", required: true },
    { key: "description", label: "Описание", multiline: true, rows: 3 },
    {
        key: "status",
        label: "Статус",
        options: Object.entries(TASK_STATUSES).map(([v, s]) => ({ value: v, label: s.label })),
        required: true,
    },
    {
        key: "priority",
        label: "Приоритет",
        options: Object.entries(TASK_PRIORITIES).map(([v, p]) => ({ value: v, label: p.label })),
    },
    { key: "due_date", label: "Срок", type: "date" },
];

export const emptyTask = () => ({
    id: `t${Date.now()}`,        // временный id; на сервере заменится
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    created_at: new Date().toISOString().slice(0, 10),
    due_date: "",
});

