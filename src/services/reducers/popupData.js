// reducers/popupDataReducer.js
import { OPEN_POPUP, CLOSE_POPUP } from "../constants/popupData";

const initialState = {
    isOpenPopup: false,
    component: null,
    props: {},
};

export const popupDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_POPUP:
            return {
                ...state,
                isOpenPopup: true,
                component: action.payload.component,
                props: action.payload.props ?? {},
            };
        case CLOSE_POPUP:
            return {
                ...state,
                isOpenPopup: false,
                component: null,
                props: {},
            };
        default:
            return state;
    }
};