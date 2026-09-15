
import React from "react";
import { Chip } from "@mui/material";
import { formats, genders, YEARS_EDUCATION } from "../constants";
import { DEPARTAMENTS_DATA } from '../../../constantsData'

export const PROFILE_FIELDS = [
    { key: "name", label: "Имя" },
    { key: "second_name", label: "Фамилия" },
    { key: "middle_name", label: "Отчество" },
    { key: "role", label: "Роль в системе" },
    { key: "position", label: "Специальность" },
    { key: "email", label: "Почта", type: "email" },
    { key: "format", label: "Формат трудоустройства", options: formats },
    { key: "year_of_start_work", label: "Начало выхода на работу", type: "year", options: YEARS_EDUCATION.map((y) => ({ value: y, label: String(y) })) },
    { key: "date_of_birth", label: "Дата рождения", type: "date" },
    { key: "gender", label: "Пол", options: genders },
    {
        key: "department_id",
        label: "Отдел",
        options: Object.entries(DEPARTAMENTS_DATA).map(([id, d]) => ({
            value: id,
            label: d.name,
        })),
        renderView: (u) =>
            React.createElement(Chip, {
                label: DEPARTAMENTS_DATA[u.department_id]?.name ?? "—",
                size: "small",
                variant: "outlined",
            }),
    },

];

export const emptyUser = () => ({
    name: "",
    second_name: "",
    middle_name: "",
    date_of_birth: "",
    gender: "",
    role: "",
    position: "",
    email: "",
    format: "",
    year_of_start_work: "",
    department_id: "",
    tasks: [],
    previous_positions: [],
    photo: "",
    education: "",
    educational_institution_id: "",
    speciality: "",
    year_of_start_education: "",
    year_of_end_education: "",
    average_score: "",
});