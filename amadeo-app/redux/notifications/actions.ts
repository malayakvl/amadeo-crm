import { createAction } from 'redux-actions';
import { authHeader } from '../../lib/functions';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;

export const fetchCntNewAction: any = createAction(
    'notifications/FETCH_CNT_NOTIFICATIONS',
    async (email: string) => {
        const res = await fetch(`${baseUrl}/count-notice`, {
            method: 'get',
            headers: authHeader(email)
        });
        const resp = await res.json();
        if (res.ok && resp.cntNotice) {
            return resp.cntNotice;
        } else {
            return 0;
        }
    }
);

export const fetchNewListAction: any = createAction(
    'notifications/FETCH_LATEST_NOTIFICATIONS',
    async (email: string) => {
        const res = await fetch(`${baseUrl}/new-notice`, {
            method: 'get',
            headers: authHeader(email)
        });
        const resp = await res.json();
        if (res.ok && resp.notifications) {
            return resp.notifications;
        } else {
            return [];
        }
    }
);
