export * from "./routes";
export { API_ROUTES } from "./ApiRoutes";
export { EMAIL_REGEX } from "./emailRegex";
export * from "./ActionTypes";

const ACCESS_TOKEN = 'accessToken';
export { ACCESS_TOKEN };

const ACCESS_TOKEN_HEADER = 'x-access-token';
export { ACCESS_TOKEN_HEADER };

export const USER_TYPE = {
    1: 'admin',
    2: 'maintainer',
    3: 'guest',
    ADMIN: 1,
    MAINTAINER: 2,
    GUEST: 3
}

export const IS_INT = /^-?\d+$/;