import { createAction } from 'redux-actions';
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;


export const fetchProfileAction: any = createAction(
    'profile/FETCH_PROFILE',
    async (email:string) => {
        return await axios
                .get(`${baseUrl}/profile?email=${email}`)
                .then(res => res.data.user);
    }
);

export const updateProfileAction: any = createAction(
    'profile/UPDATE_PROFILE',
    async (data:any) => {
        const res = await fetch(`${baseUrl}/profile`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        const resp = await res.json();
        if (res.ok && resp.user) {
            return 'yes';
        } else {
            return resp.error.message;
        }
    }
);

export const setCrudStatusAction: any = createAction('profile/SET_CRUD_STATUS');
