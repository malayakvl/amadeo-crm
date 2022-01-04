import { createAction } from 'redux-actions';
import axios from 'axios';
import getConfig from 'next/config';
import { authHeader } from '../../lib/functions';
import { setSuccessToastAction } from '../layouts';
import { setUserAction } from '../user/';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
const baseAuthUrl = `${publicRuntimeConfig.apiUrl}/auth`;

export const fetchProfileAction: any = createAction(
    'profile/FETCH_PROFILE',
    async () =>
        async (dispatch: Type.Dispatch, getState: () => State.Root): Promise<{ profile: any }> => {
            const state = getState();
            const res = await axios.get(`${baseUrl}/profile`, {
                headers: {
                    ...authHeader(state.user.user.email)
                }
            });
            return {
                profile: res.data
            };
        }
);
export const updateProfileAction: any = createAction(
    'profile/UPDATE_PROFILE',
    async (data: any) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            return axios
                .post(`${baseUrl}/profile`, data, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then(async (res) => {
                    window.localStorage.removeItem('user');
                    window.localStorage.setItem('user', JSON.stringify(res.data.user));
                    dispatch(setUserAction(res.data.user));
                    dispatch(setSuccessToastAction(`Profile has been updated`));
                });
        }
);
export const changePasswordAction: any = createAction(
    'profile/CHANGE_PASSWORD',
    async (data: any) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            return axios
                .post(`${baseUrl}/changePassword`, data, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then(async () => {
                    dispatch(setSuccessToastAction(`Password has been updated`));
                });
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

export const setValidEmailStatusAction: any = createAction('profile/SET_VALID_STATUS');
