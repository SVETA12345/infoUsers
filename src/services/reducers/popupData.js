import { OPEN_POPUP, CLOSE_POPUP } from '../constants/popupData'
const initialState = {
    isOpenPopup: false,
    componentPopup: null
};

export const popupDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_POPUP: {
            return {
                ...state,
                isOpenPopup: true,
                ...action.payload
            }
        }
        case CLOSE_POPUP: {
            return {
                isOpenPopup: false,
                componentPopup: null
            }
        }
        default: {
            return state;
        }
    }
};
