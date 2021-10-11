import { SIDEPANEL_ACTIONS } from "../constants";

export const setSelected = (selected) => async (dispatch) => {
    try {
        dispatch({
            type: SIDEPANEL_ACTIONS.SET_SELECTED,
            payload: selected
        });
    } catch (error) {
        throw error;
    }
}

export const setVisibility = (visibility) => async (dispatch) => {
    try {
        dispatch({
            type: SIDEPANEL_ACTIONS.SET_VISIBILITY,
            payload: visibility
        });
    } catch (error) {
        throw error;
    }
}

export const toggleVisibility = () => async (dispatch) => {
    const main = document.querySelector(".main-content");
    const list_container = document.querySelector(".list-container");
    const main_home = document.querySelector(".main-home");
    if (main) {
        main.classList.toggle("main-active");
    }
    if (list_container) {
        list_container.classList.toggle('list-container-active');
    }
    if (main_home) {
        main_home.classList.toggle('main-home-active');
    }
    try {
        dispatch({
            type: SIDEPANEL_ACTIONS.TOGGLE_VISIBILITY,
            payload: null
        });
    } catch (error) {
        throw error;
    }
}