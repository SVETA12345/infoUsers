// actions/popupActions.js
import { OPEN_POPUP, CLOSE_POPUP } from "../constants/popupData";

export const openPopup = (component, props = {}) => ({
  type: OPEN_POPUP,
  payload: { component, props },
});

export const closePopup = () => ({ type: CLOSE_POPUP });