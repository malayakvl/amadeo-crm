import { createAction } from 'redux-actions';
import { authHeader } from '../../lib/functions';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
import { setSuccessToastAction } from '../layouts';

export const fetchAddressAction: any = createAction(
    'addresses/FETCH_ADDRESS',
    async () =>
        async (dispatch: Type.Dispatch, getState: () => State.Root): Promise<{ address: any }> => {
            const state = getState();
            const res = await axios.get(`${baseUrl}/address`, {
                headers: {
                    ...authHeader(state.user.user.email)
                }
            });

            return res.data.address;
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
                    dispatch(
                        setSuccessToastAction(`Address has been ${isNew ? 'updated' : 'created'}`)
                    );
                });
        }
);

export const setAddressAction: any = createAction('addresses/SET_ADDRESS');
