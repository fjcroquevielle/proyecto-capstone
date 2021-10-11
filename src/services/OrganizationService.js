import { ACCESS_TOKEN, ACCESS_TOKEN_HEADER, API_ROUTES } from "../constants";

class OrganizationService {
    static async getOrganization(orgId){
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);
        return fetch( `${API_ROUTES.ORGANIZATIONS}/${orgId}`, {
            method: 'GET',
            headers
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                return resJson.organization;
            }
            // handle failure
            throw new Error(resJson.message);
        }).catch(err => {
            console.error('Caught error: ', err);
            throw err;
        })
    }

    static async updateOrganization(orgId, orgData){
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);
        return fetch( `${API_ROUTES.ORGANIZATIONS}/${orgId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(orgData)
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                return resJson.organization;
            }
            // handle failure
            throw new Error(resJson.message);
        }).catch(err => {
            console.error('Caught error: ', err);
            throw err;
        })
    }
}

export {OrganizationService};