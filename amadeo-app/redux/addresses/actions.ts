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

export const setAddressAction: any = createAction('addresses/SET_ADDRESS');
