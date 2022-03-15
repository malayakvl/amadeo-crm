import { createAction } from 'redux-actions';
import axios from 'axios';
import getConfig from 'next/config';
import { authHeader } from '../../lib/functions';
import { setErrorToastAction, setSuccessToastAction, showLoaderAction } from '../layouts/actions';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
const authUrl = `${publicRuntimeConfig.apiUrl}/auth`;

export const fetchUserAction: any = createAction('profile/FETCH_USER', async (email: string) => {
    return axios
        .get(`${baseUrl}/profile`, {
            headers: {
                ...authHeader(email)
            }
        })
        .then((res) => res.data.user)
        .catch((e) => console.log(e.message));
});
export const inviteUserAction: any = createAction(
    'user/INVITE_USER',
    async (data: any) =>
        (dispatch: Type.Dispatch): Promise<void> => {
            dispatch(showLoaderAction(true));
            return axios
                .post(`${authUrl}/invite`, data)
                .then(async () => {
                    dispatch(setSuccessToastAction(`Check confirmation link in your mailbox`));
                    dispatch(showLoaderAction(false));
                    dispatch(hideRegisterFormAction(true));
                })
                .catch((e) => {
                    // console.log('ERRROR', e.response);
                    dispatch(setErrorToastAction(e.response.data.message));
                    dispatch(showLoaderAction(false));
                });
        }
);
export const syncFbAction: any = createAction(
    'user/SYNC_FB',
    async (data: any) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            dispatch(showLoaderAction(true));
            return axios
                .post(`${baseUrl}/fb-authenticate`, data, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then(async () => {
                    dispatch(setSuccessToastAction(`Sync success`));
                    dispatch(showLoaderAction(false));
                })
                .catch((e) => {
                    dispatch(setErrorToastAction(`Sync fail`));
                    dispatch(showLoaderAction(false));
                    console.log(e.message);
                });
        }
);

export const setUserAction: any = createAction('user/SET_USER');
export const hideRegisterFormAction: any = createAction('user/HIDE_REGISTER_FORM');
