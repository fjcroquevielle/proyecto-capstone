import { MODAL_ACTION } from "../constants";

const initialState = {
    modalUser: false,
    modalDeleteUser: false,
    modalDesregister: false,
    modalOrganization: false,
    modalProject: false,
};

const rootReducer = (state = initialState, action) => {
    const {type, payload} = action;
    
    switch (type) {
        case MODAL_ACTION.SET_PROJECT_MODAL:
            return {...initialState, modalProject: payload};
        case MODAL_ACTION.SET_ORGANIZATION_MODAL:
            return {...initialState, modalOrganization: payload};
        case MODAL_ACTION.SET_DESREGISTER_MODAL:
            return {...initialState, modalDesregister: payload};
        case MODAL_ACTION.SET_DELETE_USER_MODAL:
            return {...initialState, modalDeleteUser: payload};
        case MODAL_ACTION.SET_USER_MODAL:
            return {...initialState, modalUser: payload};
        case MODAL_ACTION.CLOSE_ALL:
            return initialState;
        default:
            return state;
    }
}

export default rootReducer;