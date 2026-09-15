import { OPEN_SNACK, CLOSE_SNACK } from '../constants/snack'
const initialState = {
    isOpen: false,
    msg: "",
    sev: "success"
};

export const snackReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_SNACK: {
            return {
                ...state,
                isOpen: true,
                ...action.payload
            }
        }
        case CLOSE_SNACK: {
            return {
                ...state,
                isOpen: false,
            }
        }
        default: {
            return state;
        }
    }
};
