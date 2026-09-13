import { combineReducers } from 'redux';
import { mainMenuReducer } from './mainMenu'
import { usersReducer } from './users'
import { popupDataReducer } from './popupData'

export const rootReducer = combineReducers({
  mainMenu: mainMenuReducer,
  users: usersReducer,
  popup: popupDataReducer
});