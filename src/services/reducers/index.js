import { combineReducers } from 'redux';
import { mainMenuReducer } from './mainMenu'

export const rootReducer = combineReducers({
  mainMenu: mainMenuReducer
});