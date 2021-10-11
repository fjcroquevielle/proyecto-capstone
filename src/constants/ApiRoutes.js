const baseURL = process.env.REACT_APP_API_URL;

const usersRoutes = baseURL + '/api/users'; 
const organizationsRoutes = baseURL + '/api/organizations'; 
const projectsRoutes = baseURL + '/api/projects'; 


const API_ROUTES = {
    CATCH_ALL: baseURL,
    SIGNUP: usersRoutes + '/signup',
    SIGNIN: usersRoutes + '/signin',
    VERIFY: usersRoutes + '/verify',
    USER_DATA: usersRoutes + '/user-data',
    UPDATE_SELF: usersRoutes + '/update-self',
    DESREGISTER: usersRoutes + '/desregister',
    USERS: usersRoutes + '',
    NEW_MANTAINER: usersRoutes + '/new-mantainer',
    NEW_GUEST: usersRoutes + '/new-guest',

    ORGANIZATIONS: organizationsRoutes + '',

    PROJECTS: projectsRoutes + '',
    PROJECTS_ASSIGNED: projectsRoutes + '/assignedTo'
}

export {API_ROUTES};