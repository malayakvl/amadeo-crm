import { createAction } from 'redux-actions';
import axios from 'axios';
import getConfig from 'next/config';
import { authHeader } from '../../lib/functions';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;

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

export const setUserAction: any = createAction('user/SET_USER');
