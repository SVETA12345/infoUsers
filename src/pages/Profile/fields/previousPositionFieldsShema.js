
import { DEPARTAMENTS_DATA } from "../../../constantsData";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1970 + 1 }, (_, i) => CURRENT_YEAR - i);

export const PREVIOUS_POSITION_FIELDS = [
    {
        key: "position",
        label: "Должность",
        required: true,
    },
    {
        key: "department_id",
        label: "Отдел",
        required: true,
        options: Object.entries(DEPARTAMENTS_DATA).map(([id, d]) => ({
            value: Number(id),
            label: d.name,
        })),
    },
    {
        key: "year_start_work",
        label: "Год начала",
        type: "year",
        required: true,
        options: YEARS.map((y) => ({ value: y, label: String(y) })),
    },
    {
        key: "year_end_work",
        label: "Год окончания",
        type: "year",
        required: true,
        options: YEARS.map((y) => ({ value: y, label: String(y) })),
    },
];

export const emptyPreviousPosition = () => ({
    id: `pp${Date.now()}`,
    position: "",
    department_id: "",
    year_start_work: "",
    year_end_work: "",
});