import { ORG_ACTIONS } from "../constants";

const initialState = {
    organization: null
};

const rootReducer = (state = initialState, action) => {
    const {type, payload} = action;
    
    switch (type) {
        case ORG_ACTIONS.UPDATE_ORG:
        case ORG_ACTIONS.GET_ORG:
            return {...state, organization: payload};
        default:
            return state;
    }
}

export default rootReducer;