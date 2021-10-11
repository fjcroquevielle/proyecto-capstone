import { PROJECT_ACTIONS } from "../constants";

const initialState = {
    projects: [],
    selectedProject: null
};

const ProjectReducer = (state = initialState, action) => {
    const {type, payload} = action;
    
    switch (type) {
        case PROJECT_ACTIONS.ADD_PROJECT:
            return {...state, projects: [...state.projects, payload]};
        case PROJECT_ACTIONS.GET_PROJECTS:
        case PROJECT_ACTIONS.GET_PROJECTS_ASSIGNED:
            return {...state, projects: payload};
        case PROJECT_ACTIONS.SELECT_PROJECT:
            return {...state, selectedProject: state.projects[payload]};
        case PROJECT_ACTIONS.GET_PROJECT:
            return {...state, selectedProject: payload};
        default:
            return state;
    }
}

export default ProjectReducer;