import { UPDATE_MAIN_MENU } from '../constants/mainMenu'
const initialState = {
    isOpenMenu: true,
    activePageLink: '/users'
};

export const mainMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MAIN_MENU: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: {
            return state;
        }
    }
};
