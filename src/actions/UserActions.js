import { USER_ACTION } from "../constants";
import { UsersService } from '../services';

export const signup = (signupData) => async (dispatch) => {
    try {
        const user = await UsersService.signup(signupData);
        dispatch( { 
            type: USER_ACTION.SIGN_UP, 
            payload: user
        })
    } catch (error) {
        throw error;
    }
}

export const signin = (signinData) => async (dispatch) => {
    try {
        const user = await UsersService.signin(signinData);
        dispatch( { 
            type: USER_ACTION.SIGN_IN, 
            payload: user
        })
    } catch (error) {
        throw error;
    }
}

export const logout = () => async (dispatch) => {
    dispatch({
        type: USER_ACTION.LOG_OUT,
        payload: null
    })
}

export const getUsers = () => async (dispatch) => {
    try {
        const users = await UsersService.getUsers();
        console.log(users);
        dispatch( { 
            type: USER_ACTION.GET_USERS, 
            payload: users
        })
        
    } catch (error) {
        console.log(error);
    }
};

export const getUserData = () => async (dispatch) => {
    try {
        const user = await UsersService.getUserData();
        dispatch( { 
            type: USER_ACTION.GET_USER_DATA, 
            payload: user
        })
        
    } catch (error) {
        dispatch( { 
            type: USER_ACTION.LOG_OUT, 
            payload: null
        })
        console.error(error.message);
        throw error;
    }
};

export const addUser = (userData, isMaintainer) => async (dispatch) => {
    try {
        const user = await UsersService.addUser(userData, isMaintainer);
        if (!user) {
            throw new Error("user not created.");
        }
        dispatch( { 
            type: USER_ACTION.ADD_USER, 
            payload: user
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const verifyUser = (userData) => async (dispatch) => {
    try {
        const verifiedUser = await UsersService.verifyUser(userData);
        if(!verifiedUser){
            throw new Error("user not verified");
        }
        dispatch({
            type: USER_ACTION.VERIFY_USER,
            payload: verifiedUser
        })
    } catch (error) {
        throw error;
    }
}

export const updateSelf = (userData) => async (dispatch) => {
    try {
        const updatedUser = await UsersService.updateSelf(userData);
        if(!updatedUser){
            throw new Error("user not updated");
        }
        dispatch({
            type: USER_ACTION.UPDATE_SELF,
            payload: updatedUser
        })
    } catch (error) {
        throw error;
    }
}

export const updateUser = (userId, userData) => async (dispatch) => {
    try {
        const updatedUser = await UsersService.updateUser(userId, userData);
        if(!updatedUser){
            throw new Error(`user ${userId} not updated`);
        }
        dispatch({
            type: USER_ACTION.UPDATE_USER,
            payload: updatedUser
        })
    } catch (error) {
        throw error;
    }
}

export const getUser = (userId) => async (dispatch) => {
    try {
        const user = await UsersService.getUser(userId);
        if(!user){
            throw new Error(`user ${userId} not found`);
        }
        dispatch({
            type: USER_ACTION.GET_USER,
            payload: user
        })
    } catch (error) {
        throw error;
    }
}

export const deleteUser = (userId) => async (dispatch) => {
    try {
        
        await UsersService.deleteUser(userId);
        // if(!deletedUser){
        //     throw new Error(`user ${userId} not deleted`);
        // }
        dispatch({
            type: USER_ACTION.DELETE_USER,
            payload: userId
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const desregister = () => async (dispatch) => {
    try {
        await UsersService.desregisterUser();
        dispatch({
            type: USER_ACTION.DESREGISTER,
            payload: true
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const selectUser = (userIndex) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ACTION.SELECT_USER,
            payload: userIndex
        })
    } catch (error) {
        throw error;
    }
}