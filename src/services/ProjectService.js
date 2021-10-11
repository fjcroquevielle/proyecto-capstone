import { ACCESS_TOKEN, ACCESS_TOKEN_HEADER, API_ROUTES } from "../constants";

class ProjectService {
    static async getProjects(){
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);
        return fetch( API_ROUTES.PROJECTS, {
            method: 'GET',
            headers
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                return resJson.projects;
            }
            // handle failure
            throw new Error(resJson.message);
        }).catch(err => {
            console.error('Caught error: ', err);
            throw err;
        })
    }

    static async addProject(projectData){
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);
        return fetch( API_ROUTES.PROJECTS, {
            method: 'POST',
            headers,
            body: JSON.stringify(projectData)
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                return resJson.project;
            }
            console.error(resJson);
            // handle failure
            throw new Error(resJson.message);
        }).catch(err => {
            console.error('Caught error: ', err);
            throw err;
        })
    }
    
    static async getProjectsAssigned(mantainerId){
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);
        return fetch( `${API_ROUTES.PROJECTS_ASSIGNED}/${mantainerId}`, {
            method: 'GET',
            headers
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                return resJson.projects;
            }
            // handle failure
            throw new Error(resJson.message);
        }).catch(err => {
            console.error('Caught error: ', err);
            throw err;
        })
    }
    
    static async getProject(projectId){
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);
        return fetch( `${API_ROUTES.PROJECTS}/${projectId}`, {
            method: 'GET',
            headers
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                return resJson.project;
            }
            // handle failure
            throw new Error(resJson.message);
        }).catch(err => {
            console.error('Caught error: ', err);
            throw err;
        })
    }
}

export {ProjectService};