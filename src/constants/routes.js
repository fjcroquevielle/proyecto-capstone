
export const PARAMS = {
    USER_ID : ":userId",
    PROJECT_ID : ":projectId",
    PROJECT_VIEW: ":projectView"
}

export const ROUTES = {
    HOME : "/",
    LOGGED_HOME: "/home",
    FREE_DOWNLOADS : "/free-downloads",
    SIGN_UP: "/sign-up",
    SIGN_IN: "/sign-in",
    MY_ACCOUNT: "/my-account",
    PROJECTS: "/projects",
    MY_PAGE: "/my-page",
    USER_PAGE: "/user-page/" + PARAMS.USER_ID,
    PROJECT_PAGE: "/projects/" + PARAMS.PROJECT_ID,
    PROJECT_PAGE_VIEW: "/projects/" + PARAMS.PROJECT_ID + "/" + PARAMS.PROJECT_VIEW,
    VERIFY_ACCOUNT: "/verify-account",
    MY_ORG: "/my-org"
};