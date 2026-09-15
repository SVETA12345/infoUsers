import { DELETE_BY_ID_USERS, UPDATE_USER_BY_ID, CREATE_USER } from '../constants/users'
import { USERS_DATA } from '../../constantsData'
const initialState = USERS_DATA

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_BY_ID_USERS: {
            const idsToDelete = new Set(action.payload.usersDelete.map(user => user.id));
            return state.filter(user => !idsToDelete.has(user.id));
        }
        case UPDATE_USER_BY_ID: {
            return state.map(us => {
                if (us.id === action.payload.id) return { ...us, ...action.payload }
                else return us;
            });
        }
        case CREATE_USER: {
            return [
                ...state,
                action.payload
            ]
        }

        default: {
            return state;
        }
    }
};