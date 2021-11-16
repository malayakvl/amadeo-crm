import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem("user") || "{}"));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    register,
    update,
    delete: _delete
};

function login(username:string, password:string) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
        .then((user:any) => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

function register(user:any) {
    // return fetch(`${baseUrl}/post-test`, {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(user)
    // })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.log(error))
    return fetchWrapper.post(`${baseUrl}/post-test`, user);
}


function update(id:bigint, params:any) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then((x:any) => {
            // update stored user if the logged in user updated their own record
            if (id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id:bigint) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
