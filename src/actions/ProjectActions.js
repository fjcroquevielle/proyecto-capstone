import { PROJECT_ACTIONS } from "../constants";
import { ProjectService } from "../services";

export const getProjects = () => async (dispatch) => {
    try {
        const projects = await ProjectService.getProjects();
        if (!projects) {
            throw new Error("projects not found.")
        }
        dispatch({
            type: PROJECT_ACTIONS.GET_PROJECTS,
            payload: projects
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addProject = (projectData) => async (dispatch) => {
    try {
        const project = await ProjectService.addProject(projectData);
        if (!project) {
            throw new Error("projects not created.")
        }
        dispatch({
            type: PROJECT_ACTIONS.ADD_PROJECT,
            payload: project
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getProjectsAssigned = (mantainerId) => async (dispatch) => {
    try {
        const projects = await ProjectService.getProjectsAssigned(mantainerId);
        if (!projects) {
            throw new Error("projects not found.")
        }
        dispatch({
            type: PROJECT_ACTIONS.GET_PROJECTS_ASSIGNED,
            payload: projects
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const selectProject = (projectIndex) => async (dispatch) => {
    try {
        dispatch({
            type: PROJECT_ACTIONS.SELECT_PROJECT,
            payload: projectIndex
        })
    } catch (error) {
        throw error;
    }
}

export const getProject = (projectId) => async (dispatch) => {
    try {
        const project = await ProjectService.getProject(projectId);
        if(!project){
            throw new Error(`project ${projectId} not found`);
        }
        dispatch({
            type: PROJECT_ACTIONS.GET_PROJECT,
            payload: project
        })
    } catch (error) {
        throw error;
    }
}