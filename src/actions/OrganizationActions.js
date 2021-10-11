import { ORG_ACTIONS } from "../constants";
import { OrganizationService } from "../services";

export const getOrganization = (orgId) => async (dispatch) => {
    try {
        const organization = await OrganizationService.getOrganization(orgId);
        if (!organization) {
            throw new Error("organization not found.")
        }
        dispatch({
            type: ORG_ACTIONS.GET_ORG,
            payload: organization
        })
    } catch (error) {
        console.error(error);
        // throw error;
    }
}

export const updateOrganization = (orgId, orgData) => async (dispatch) => {
    try {
        const organization = await OrganizationService.updateOrganization(orgId, orgData);
        if (!organization) {
            throw new Error("organization not found.")
        }
        dispatch({
            type: ORG_ACTIONS.UPDATE_ORG,
            payload: organization
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}