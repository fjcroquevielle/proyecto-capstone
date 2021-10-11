import { ACCESS_TOKEN, ACCESS_TOKEN_HEADER, API_ROUTES } from "../constants";

class UsersService {

    static async signup(signupData) {
        return fetch(API_ROUTES.SIGNUP, {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        }).then(async res => {
            const resJson = await res.json();
            if (res.status === 200) {
                return resJson.message;
            }
            throw resJson.message;
        }).catch(err => {
            throw(err)
        })
    }

    static async signin(signinData) {
        return fetch(API_ROUTES.SIGNIN, {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(signinData)
        }).then(async res => {
            const resJson = await res.json();
            console.log(resJson);
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, resJson.accessToken);
                return resJson.user;
            }
            throw resJson.message;
        }).catch(err => {
            throw(err)
        })
    }

    static async getUsers() {
        const headers = {};
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);

        return fetch(API_ROUTES.USERS, {
            method: 'GET',
            headers
        }).then(res => {
            // handle success
            if (res.status === 200) {
                return res.json().then(data=>{
                    return data.members;
                })
            }
            // handle failure
            return [];
        }).catch(err => {
            console.error('Caught error: ', err);
        })
    }

    
    static async getUserData() {
        const headers = {};
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);

        return fetch(API_ROUTES.USER_DATA, {
            method: 'GET',
            headers
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                return resJson.user;
            }
            // handle failure
            throw resJson.message;
        }).catch(err => {
            console.error('Caught error: ', err);
            throw err;
        })
    }

    static async verifyUser(userData) {
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);
        return fetch(API_ROUTES.VERIFY, {
            method: 'POST',
            headers,
            body: JSON.stringify(userData)
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                return resJson.user;
            }
            // handle failure
            throw resJson.message;
        }).catch(err => {
            console.error('Caught error: ', err);
            throw err;
        })
    }

    static async updateSelf(userData) {
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);
        return fetch(API_ROUTES.UPDATE_SELF, {
            method: 'PUT',
            headers,
            body: JSON.stringify(userData)
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                return resJson.user;
            }
            // handle failure
            throw resJson.message;
        }).catch(err => {
            console.error('Caught error: ', err);
            throw err;
        })
    }

    static async updateUser(userId, userData) {
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);
        return fetch( `${API_ROUTES.USERS}/${userId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(userData)
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                return resJson.user;
            }
            // handle failure
            throw resJson.message;
        }).catch(err => {
            console.error('Caught error: ', err);
            throw err;
        })
    }

    static async getUser(userId) {
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);
        return fetch( `${API_ROUTES.USERS}/${userId}`, {
            method: 'GET',
            headers
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                return resJson.user;
            }
            // handle failure
            throw resJson.message;
        }).catch(err => {
            console.error('Caught error: ', err);
            throw err;
        })
    }

    static async deleteUser(userId) {
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);
        return fetch( `${API_ROUTES.USERS}/${userId}`, {
            method: 'DELETE',
            headers
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, resJson.accessToken);
                return resJson.deletedUser;
            }
            // handle failure
            throw resJson.message;
        }).catch(err => {
            console.error('Caught error: ', err);
            throw err;
        })
    }

    static async desregisterUser() {
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);
        return fetch( API_ROUTES.DESREGISTER, {
            method: 'DELETE',
            headers
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                return resJson.deletedUser;
            }
            // handle failure
            throw resJson.message;
        }).catch(err => {
            console.error('Caught error: ', err);
            throw err;
        })
    }

    static async addUser(userData, isMantainer){
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        headers[ACCESS_TOKEN_HEADER] = localStorage.getItem(ACCESS_TOKEN);

        return fetch(isMantainer ? API_ROUTES.NEW_MANTAINER : API_ROUTES.NEW_GUEST, {
            method: 'POST',
            headers,
            body: JSON.stringify( userData)
        }).then(async res => {
            const resJson = await res.json();
            // handle success
            if (res.status === 200) {
                return resJson.newUser;
            }
            // handle failure
            throw resJson.message;
        }).catch(err => {
            console.error('Caught error: ', err);
            throw new Error(err);
        })
    }


}

export { UsersService };