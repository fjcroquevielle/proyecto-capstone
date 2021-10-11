import { ACCESS_TOKEN, USER_ACTION } from "../constants";

const initialState = {
    currentUser: null,
    users: [],
    indexedUsers: {},
    selectedUser: null
};

const UserReducer = (state = initialState, action) => {
    const {type, payload} = action;
    
    switch (type) {
        case USER_ACTION.DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user=> user.id !== payload)
            }

        case USER_ACTION.UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user=>{
                    if (user.id === payload.id) {
                        return payload;
                    }
                    return user;
                }),
                indexedUsers: {...state.indexedUsers, [payload.id]: payload}
            }

        case USER_ACTION.GET_USER:
            return {...state, selectedUser: payload};
        
        case USER_ACTION.SELECT_USER:
            if (!Number.isInteger(payload) || payload < 0 || payload >= state.users.length) {
                return {...state, selectedUser: initialState.selectedUser};
            }
            return {...state, selectedUser: state.users[payload]};

        case USER_ACTION.DESREGISTER:
        case USER_ACTION.LOG_OUT:
            localStorage.removeItem(ACCESS_TOKEN);
            return {...state, currentUser: payload};

        case USER_ACTION.UPDATE_SELF:
        case USER_ACTION.VERIFY_USER:
        case USER_ACTION.GET_USER_DATA:
        case USER_ACTION.SIGN_IN:
            return {...state, currentUser: payload};

        case USER_ACTION.GET_USERS:
            const newIndexedUsers = {};
            payload.forEach(user => {
                newIndexedUsers[user.id] = user;
            });
            return {
                ...state, 
                users: payload,
                indexedUsers: newIndexedUsers
            };

        case USER_ACTION.ADD_USER:
            return {
                ...state, 
                users: [...state.users, payload],
                indexedUsers: {...state.indexedUsers, [payload.id]: payload}
            };

        default:
            return state;
    }
}

export default UserReducer;