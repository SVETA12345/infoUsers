import { DELETE_BY_ID_USERS } from '../constants/users'
import { USERS_DATA } from '../../constantsData'
const initialState = USERS_DATA

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_BY_ID_USERS: {
            const idsToDelete = new Set(action.payload.usersDelete.map(user => user.id));
            return state.filter(user => !idsToDelete.has(user.id));
        }
        default: {
            return state;
        }
    }
};