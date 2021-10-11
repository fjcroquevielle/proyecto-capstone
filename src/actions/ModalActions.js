import { MODAL_ACTION } from "../constants"

export const setUserModal = (modalVisibility) => async (dispatch)  => {
    dispatch({
        type: MODAL_ACTION.SET_USER_MODAL,
        payload: modalVisibility
    });
}

export const setDeleteUserModal = (modalVisibility) => async (dispatch)  => {
    dispatch({
        type: MODAL_ACTION.SET_DELETE_USER_MODAL,
        payload: modalVisibility
    });
}

export const setDesregisterModal = (modalVisibility) => async (dispatch)  => {
    dispatch({
        type: MODAL_ACTION.SET_DESREGISTER_MODAL,
        payload: modalVisibility
    });
}

export const setOrganizationModal = (modalVisibility) => async (dispatch)  => {
    dispatch({
        type: MODAL_ACTION.SET_ORGANIZATION_MODAL,
        payload: modalVisibility
    });
}

export const setProjectModal = (modalVisibility) => async (dispatch)  => {
    dispatch({
        type: MODAL_ACTION.SET_PROJECT_MODAL,
        payload: modalVisibility
    });
}

export const closeAll = (closeAll) => {
    return {
        type: MODAL_ACTION.CLOSE_ALL,
        payload: closeAll
    }
}