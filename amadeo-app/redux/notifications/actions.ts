import { createAction } from 'redux-actions';
import { authHeader } from '../../lib/functions';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;

export const fetchCntNewAction: any = createAction(
    'addresses/FETCH_CNT_NOTIFICATIONS',
    async (email: string) => {
        const res = await fetch(`${baseUrl}/address`, {
            method: 'get',
            headers: authHeader(email)
        });
        const resp = await res.json();
        if (res.ok && resp.addresses) {
            return resp.addresses;
        } else {
            return resp.error.message;
        }
    }
);
