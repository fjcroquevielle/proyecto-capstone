import { SIDEPANEL_ACTIONS } from "../constants";

const initialState = {
    selected: "",
    visible: false
};

const SidePanelReducer = (state = initialState, action) => {
    const {type, payload} = action;
    
    switch (type) {
        case SIDEPANEL_ACTIONS.SET_SELECTED:
            return {...state, selected: payload};
        case SIDEPANEL_ACTIONS.SET_VISIBILITY:
            return {... state, visible: payload};
        case SIDEPANEL_ACTIONS.TOGGLE_VISIBILITY:
            return {... state, visible:!state.visible}
        default:
            return state;
    }
}

export default SidePanelReducer;