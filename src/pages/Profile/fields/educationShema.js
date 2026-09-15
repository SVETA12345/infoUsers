
import { Chip } from "@mui/material";
import { UNIVERSITIES_DATA, } from '../../../constantsData';
import { UNIVERSITIES_OPTIONS, EDUCATION_LEVELS, YEARS_EDUCATION } from '../constants'

export const EDUCATION_FIELDS = [
    { key: "education", label: "Уровень образования", options: EDUCATION_LEVELS },

    {
        key: "educational_institution_id",
        label: "Учебное заведение",
        options: UNIVERSITIES_OPTIONS,
        renderView: (u) => (
            <Chip
                label={UNIVERSITIES_DATA[u.educational_institution_id]?.name ?? "—"}
                size="small"
                variant="outlined"
            />
        ),
    },

    { key: "speciality", label: "Специальность" },
    { key: "year_of_start_education", label: "Год начала обучения", type: "year", options: YEARS_EDUCATION.map((y) => ({ value: y, label: String(y) })) },
    { key: "year_of_end_education", label: "Год окончания", type: "year", options: YEARS_EDUCATION.map((y) => ({ value: y, label: String(y) })) },
    {
        key: "average_score",
        label: "Средний балл",
        type: 'number',
        // 2 знака после запятой
        renderView: (u) => (u.average_score != null ? Number(u.average_score).toFixed(2) : "—"),
    },
];

export const emptyEducation = () => ({
    education: "",
    educational_institution_id: "",
    speciality: "",
    year_of_start_education: "",
    year_of_end_education: "",
    average_score: "",
});