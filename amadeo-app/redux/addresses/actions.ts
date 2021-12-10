import { createAction } from 'redux-actions';
import { authHeader } from '../../lib/functions';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
import { setSuccessToastAction } from '../layouts';

export const fetchAddressesAction: any = createAction(
    'addresses/FETCH_ADDRESSES',
    async () =>
        async (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{ addresses: any }> => {
            const state = getState();
            const res = await axios.get(`${baseUrl}/address`, {
                headers: {
                    ...authHeader(state.user.user.email)
                }
            });
            return {
                addresses: res.data.addresses
            };
        }
);

export const fetchAddressAction: any = createAction(
    'addresses/FETCH_ADDRESS',
    async (id: number) =>
        async (dispatch: Type.Dispatch, getState: () => State.Root): Promise<{ address: any }> => {
            const state = getState();
            const res = await axios.get(`${baseUrl}/address/fetch/${id}`, {
                headers: {
                    ...authHeader(state.user.user.email)
                }
            });
            return {
                address: res.data.address
            };
        }
);

export const addAddressAction: any = createAction(
    'assetModels/ADD_ADDRESS',
    async (data: any) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            const isNew = data.id;
            return axios
                .post(`${baseUrl}/address`, data, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then(async () => {
                    await dispatch(fetchAddressesAction());
                    dispatch(
                        setAddressAction({
                            country_id: '',
                            state: '',
                            post_code: '',
                            address_type: '',
                            city: '',
                            address_line_1: '',
                            address_line_2: ''
                        })
                    );
                    dispatch(
                        setSuccessToastAction(`Address has been ${isNew ? 'updated' : 'created'}`)
                    );
                });
        }
);

export const deleteAddressAction: any = createAction(
    'addresses/DELETE_ADDRESS',
    async (id: string) => {
        return (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            return axios
                .delete(`${baseUrl}/address/${id}`, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then(async () => {
                    await dispatch(fetchAddressesAction());
                    dispatch(setSuccessToastAction('Address has been has been deleted'));
                });
        };
    }
);

export const setAddressAction: any = createAction('addresses/SET_ADDRESS');
