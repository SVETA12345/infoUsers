import { useState, useMemo, useEffect, useCallback } from "react";
import {
    Box, Container, Typography, Button, Stack,
    Chip
} from "@mui/material";
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Close as CloseIcon,
    Business as BusinessIcon,
    Place as PlaceIcon,
    Phone as PhoneIcon,
    Email as EmailIcon
} from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { DEPARTAMENTS_DATA, UNIVERSITIES_DATA } from '../../constantsData'
import { ALL_TABS, DEFAULT_VISIBLE_TABS } from './constants'
import { UPDATE_USER_BY_ID, CREATE_USER } from '../../services/constants/users'
import { OPEN_SNACK } from '../../services/constants/snack'
import { EDUCATION_FIELDS, emptyEducation } from './fields/educationShema'
import { PROFILE_FIELDS, emptyUser } from "./fields/userSchema";
import { closePopup } from '../../services/actions/popupData'
import TabMenu from "../../components/TabMenu/TabMenu";
import TabMenuFilter from "../../components/TabMenuFilter/TabMenuFilter";


import { validateFormUser, validateFormEducation } from "./validation";


import TasksTab from '../../components/TasksTab/TasksTab'
import PreviousPositionsTab from "../../components/PreviousPositionsTab/PreviousPositionsTab";
import ProfileTab from '../../components/ProfileTab/ProfileTab'
import EducationTab from '../../components/EducationTab/EducationTab'

import { buildFormData } from "./buildFormData";


export default function ProfilePage() {
    const { userId } = useParams();
    const [userIdParams, setUserIDParams] = useState(userId)
    const users = useSelector((state) => state.users);
    const user = useMemo(() => {

        if (!userIdParams) return emptyUser();
        return users.find((u) => u.id === userIdParams) ?? emptyUser();
    }, [users, userIdParams]);
    const [form, setForm] = useState(user);
    const [editing, setEditing] = useState(false);
    const dispatch = useDispatch()

    const [visibleTabs, setVisibleTabs] = useState(DEFAULT_VISIBLE_TABS);

    const [tab, setTab] = useState("profile");
    const [errors, setErrors] = useState({});

    const [filterAnchor, setFilterAnchor] = useState(null);
    //зависит в режиме редактирования или нет
    const userAcive = editing ? form : user;
    const university = UNIVERSITIES_DATA[editing ? form.educational_institution_id : userAcive.educational_institution_id] || emptyEducation();
    const rowsUniversity = [
        { icon: <BusinessIcon fontSize="small" />, label: "Название", value: university.name },
        { icon: <PlaceIcon fontSize="small" />, label: "Адрес", value: university.address },
        { icon: <PhoneIcon fontSize="small" />, label: "Телефон", value: university.phone },
        { icon: <EmailIcon fontSize="small" />, label: "Почта", value: university.email },
    ];
    const rowsDepartement = [
        { icon: <BusinessIcon fontSize="small" />, label: "Название", value: DEPARTAMENTS_DATA[userAcive.department_id]?.name ?? "—" },
        { icon: <PlaceIcon fontSize="small" />, label: "Адрес", value: DEPARTAMENTS_DATA[userAcive.department_id]?.adress ?? "—" },
        { icon: <PhoneIcon fontSize="small" />, label: "Телефон", value: DEPARTAMENTS_DATA[userAcive.department_id]?.phone ?? "—" },
    ];
    const activeTabLabel =
        ALL_TABS.find((t) => t.id === tab)?.label ?? "—";


    const shownTabs = useMemo(
        () => ALL_TABS.filter((t) => visibleTabs.includes(t.id)),
        [visibleTabs]
    );



    const onChange = useCallback((key, val) => {
        setForm((f) => ({ ...f, [key]: val }));
        if (errors[key]) setErrors((e) => ({ ...e, [key]: null }));
    }, [errors]);
    const formData = useMemo(
        () =>
            buildFormData(PROFILE_FIELDS, {
                user,
                form,
                editing,
                onChange,
                errors,
            }),
        [user, form, editing, errors, onChange]
    );

    const educationFormData = useMemo(
        () =>
            buildFormData(EDUCATION_FIELDS, {
                user,
                form,
                editing,
                onChange,
                errors,
            }),
        [user, form, editing, onChange, errors]
    );

    // редактирование формы
    const startEdit = () => { setForm(user); setEditing(true); };
    const cancelEdit = () => { setEditing(false); setForm(user); };

    const saveEdit = (newElement = {}, keyEl) => {
        let errs = {}
        let formSave = { ...user }
        let fields = []
        if (tab === "profile") {
            errs = validateFormUser(form);
            fields = [...PROFILE_FIELDS]
            fields.push({ 'key': 'photo' })
        }
        else if (tab === "education") {
            errs = validateFormEducation(form);
            fields = EDUCATION_FIELDS

        }

        else {
            formSave = { ...user }
            if (formSave[keyEl].findIndex(ts => ts.id === newElement.id) !== -1) {
                formSave[keyEl] = user[keyEl].map(ts => {
                    if (newElement.id === ts.id) return newElement
                    else return ts
                })
            }
            else formSave[keyEl] = [...formSave[keyEl], newElement]

        }
        if (Object.keys(errs).length) {
            dispatch({ type: OPEN_SNACK, payload: { open: true, msg: "Проверьте поля", sev: "error" } });
            setErrors(errs)
            return;
        }
        for (let fl of fields) {
            formSave[fl.key] = form[fl.key]
        }
        if (user.id) updateUser(formSave)
        else createUser(formSave);


    };
    const updateUser = (formSave) => {
        dispatch({ type: UPDATE_USER_BY_ID, payload: formSave });
        dispatch(closePopup());
        setEditing(false);
        dispatch({ type: OPEN_SNACK, payload: { open: true, msg: "Изменения сохранены", sev: "success" } });
    }

    const createUser = (formSave) => {
        const id = `pp${Date.now()}`
        setUserIDParams(id)
        dispatch({ type: CREATE_USER, payload: { ...formSave, id: id } });
        dispatch(closePopup());
        setEditing(false);
        dispatch({ type: OPEN_SNACK, payload: { open: true, msg: "Изменения сохранены", sev: "success" } });
    }


    // видимых фильтр вкладок 
    const toggleTab = (id) => {
        setVisibleTabs((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };
    const resetTabs = () => setVisibleTabs(DEFAULT_VISIBLE_TABS);
    const selectAllTabs = () => setVisibleTabs(ALL_TABS.map((t) => t.id));





    // если активный таб скрыли — переключаемся на первый доступный
    useEffect(() => {
        if (!visibleTabs.includes(tab) && shownTabs.length) {
            setTab(shownTabs[0].id);
        }
    }, [visibleTabs, tab, shownTabs]);
    useEffect(() => {
        setErrors({})
    }, [activeTabLabel])

    useEffect(() => {
        setUserIDParams(userId)
    }, [userId])



    return (
        <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", py: 4 }}>
            <Container maxWidth="lg">
                <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h5" fontWeight={500}>
                        {`${user.second_name} ${user.name} ${user.middle_name}`}
                    </Typography>

                </Stack>

                {/* Табы + фильтр */}
                <TabMenu tab={tab} shownTabs={shownTabs} setFilterAnchor={setFilterAnchor} setTab={setTab} />
                <TabMenuFilter toggleTab={toggleTab} filterAnchor={filterAnchor} setFilterAnchor={setFilterAnchor} ALL_TABS={ALL_TABS} selectAllTabs={selectAllTabs} resetTabs={resetTabs} visibleTabs={visibleTabs} />

                {/* Кнопки действий */}
                <Stack direction="row" spacing={2} sx={{ my: 3 }} alignItems="center">
                    {!editing ? (
                        <>

                            <Button
                                variant="contained" size="small"
                                startIcon={<EditIcon />}
                                onClick={startEdit}
                                sx={{ ml: "auto" }}
                            >
                                Редактировать
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained" size="small" color="success"
                                startIcon={<SaveIcon />} onClick={saveEdit}
                            >
                                Сохранить
                            </Button>
                            <Button
                                variant="outlined" size="small" color="inherit"
                                startIcon={<CloseIcon />} onClick={cancelEdit}
                            >
                                Отмена
                            </Button>
                            <Chip
                                label="Режим редактирования"
                                color="warning" size="small"
                                sx={{ ml: "auto" }}
                            />
                        </>
                    )}
                </Stack>

                {/* Контент активной вкладки */}
                {tab === "profile" && (
                    <ProfileTab formData={formData} rowsDepartement={rowsDepartement} editing={editing} form={form} user={user} onChange={onChange} userAcive={userAcive} />
                )}
                {tab === "education" && (
                    <EducationTab educationFormData={educationFormData} university={university} rowsUniversity={rowsUniversity} />
                )}


                {tab === "tasks" && (
                    <TasksTab
                        user={user}
                        editable={editing}
                        saveEdit={saveEdit}
                        updateUser={updateUser}
                    />
                )}
                {tab === "previous_positions" && (
                    <PreviousPositionsTab
                        user={editing ? form : user}
                        editable={editing}
                        saveEdit={saveEdit}
                        updateUser={updateUser}
                    />
                )}
            </Container>


        </Box>
    );
}