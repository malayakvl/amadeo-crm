import { createAction } from 'redux-actions';
import axios from 'axios';
import getConfig from 'next/config';
import { authHeader } from '../../lib/functions';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
const baseAuthUrl = `${publicRuntimeConfig.apiUrl}/auth`;

export const fetchProfileAction: any = createAction(
    'profile/FETCH_PROFILE',
    async (email: string) => {
        return axios
            .get(`${baseUrl}/profile`, {
                headers: {
                    ...authHeader(email)
                }
            })
            .then((res) => res.data.user);
    }
);

export const updateProfileAction: any = createAction(
    'profile/UPDATE_PROFILE',
    async (data: any, email: string) => {
        return await axios
            .post(`${baseUrl}/profile`, data, {
                headers: {
                    ...authHeader(email)
                }
            })
            .then((res) => {
                // then print response status
                window.localStorage.removeItem('user');
                window.localStorage.setItem('user', JSON.stringify(res.data.user));
            })
            .then(() => 'yes')
            .catch((err) => err.message);
    }
);

export const changePasswordAction: any = createAction(
    'profile/CHANGE_PASSWORD',
    async (data: any, email: string) => {
        const res = await fetch(`${baseUrl}/changePassword`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json', ...authHeader(email) }
        });
        const resp = await res.json();
        if (res.ok && resp.status) {
            return 'yes';
        } else {
            return resp.error.message;
        }
    }
);

export const restorePasswordAction: any = createAction(
    'profile/RESTORE_PASSWORD',
    async (data: any) => {
        const res = await fetch(`${baseAuthUrl}/restorePassword`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        const resp = await res.json();
        if (res.ok && resp.status) {
            return 'yes';
        } else {
            return resp.error.message ? resp.error.message : resp.error;
        }
    }
);

export const setCrudStatusAction: any = createAction('profile/SET_CRUD_STATUS');
export const setValidEmailStatusAction: any = createAction('profile/SET_VALID_STATUS');
