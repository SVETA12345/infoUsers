import { UNIVERSITIES_DATA } from '../../constantsData'
const CURRENT_YEAR = new Date().getFullYear();


export const YEARS_EDUCATION = Array.from(
    { length: CURRENT_YEAR - 1900 + 1 },
    (_, i) => CURRENT_YEAR - i
);
export const formats = [{ value: "Удаленно", label: "Удаленно" }, { value: "Офис", label: "Офис" }, { value: "Гибрид", label: "Гибрид" }];
export const genders = [{ value: "мужской", label: "мужской" }, { value: "женский", label: "женский" }];
export const UNIVERSITIES_OPTIONS = Object.entries(UNIVERSITIES_DATA).map(
    ([id, u]) => ({ value: id, label: u.name })
);

const levels = ["среднее", "среднее специальное", "неоконченное высшее", "высшее", "учёная степень"];
export const EDUCATION_LEVELS = levels.map(ed => { return { value: ed, label: ed } })

export const TASK_STATUSES = {
    todo: { label: "К выполнению", color: "default" },
    in_progress: { label: "В работе", color: "info" },
    review: { label: "На проверке", color: "warning" },
    done: { label: "Выполнено", color: "success" },
    cancelled: { label: "Отменено", color: "error" },
};

export const TASK_PRIORITIES = {
    low: { label: "Низкий", color: "default" },
    medium: { label: "Средний", color: "info" },
    high: { label: "Высокий", color: "warning" },
    critical: { label: "Критичный", color: "error" },
};


export const ALL_TABS = [
    { id: "profile", label: "Профиль" },
    { id: "education", label: "Образование" },
    { id: "tasks", label: "Задачи" },
    { id: "previous_positions", label: "Опыт работы" },
];

export const DEFAULT_VISIBLE_TABS = ALL_TABS.slice(0, 5).map((t) => t.id);
