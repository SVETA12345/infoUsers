
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validateEmail = (value) => {
    if (!value) return "Укажите почту";
    if (!EMAIL_RE.test(value)) return "Некорректный адрес почты";
    return "";
};

const validateAverageScore = (value) => {
    if (value < 0 || value > 5) return "Некорректный средний балл";
    return "";
};


const validateFormUser = (form) => {
    const errors = {};
    const emailErr = validateEmail(form.email);
    if (emailErr) errors.email = emailErr;

    if (!form.role) errors.role = "Укажите роль";
    if (!form.position) errors.position = "Укажите специальность";
    return errors;
};
const validateFormEducation = (form) => {
    const errors = {};
    const averageScoreErr = validateAverageScore(form.average_score)
    if (averageScoreErr) errors.average_score = averageScoreErr;
    return errors;
};

export { validateFormUser, validateFormEducation };