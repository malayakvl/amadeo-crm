import { createAction } from 'redux-actions';
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;


export const fetchAddressesAction: any = createAction(
    'addresses/FETCH_ADDRESSES',
    async (email:string) => {
        return await axios
                .get(`${baseUrl}/address/${email}`)
                .then(res => res.data.addresses);
    }
);

export const fetchAddressAction: any = createAction(
    'addresses/FETCH_ADDRESS',
    async (id:number) => {
        return await axios
            .get(`${baseUrl}/address/fetch/${id}`)
            .then(res => res.data.address);
    }
);

export const deleteAddressAction: any = createAction(
    'addresses/DELETE_ADDRESS',
    async (id:number) => {
        const res = await fetch(`${baseUrl}/address/${id}`, {
            method: 'delete',
            headers: { "Content-Type": "application/json" }
        });
        const resp = await res.json();
        if (res.ok && resp.status) {
            return 'delete';
        } else {
            return resp.error.message;
        }
    }
);


export const addAddressAction: any = createAction(
    'addresses/ADD_ADDRESS',
    async (data:any, email: string) => {
        const res = await fetch(`${baseUrl}/address/${email}`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        const resp = await res.json();
        if (res.ok && resp.status) {
            return data.id ? 'update' : 'create';
        } else {
            return resp.error.message;
        }
    }
);

export const setAddressAction: any = createAction('addresses/SET_ADDRESS');

export const setCrudStatusAction: any = createAction('addresses/SET_CRUD_STATUS');
