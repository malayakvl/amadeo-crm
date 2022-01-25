import axios from 'axios';
import { createAction } from 'redux-actions';
import { authHeader } from '../../lib/functions';
import getConfig from 'next/config';
import { setSuccessToastAction, setErrorToastAction } from '../layouts/actions'

const { publicRuntimeConfig } = getConfig();
const url = `${publicRuntimeConfig.apiUrl}/api/shipping`;

export const fetchShippingAction: any = createAction(
    'SHIPMENT/FETCH_SHIPPING',
    (id: number) => async (dispatch: Type.Dispatch, getState: () => State.Root): Promise<{ shipping: Pick<State.Shippings, 'shipping'> }> => {
        const state = getState();

        const response = await axios.get(`${url}/fetch/${id}`, {
            headers: {
                ...authHeader(state.user.user.email)
            }
        })

        const shipping: State.Shippings = response.data;

        return { shipping };

    }
);

export const fetchShippingsAction: any = createAction(
    'SHIPMENT/FETCH_SHIPPING_LIST',
    () => async (dispatch: Type.Dispatch, getState: () => State.Root): Promise<{ list: Pick<State.Shippings, 'list'> }> => {
        const state = getState();

        const response = await axios.get(`${url}/fetch-all`, {
            headers: {
                ...authHeader(state.user.user.email)
            }
        })

        const shippings: State.Shippings = response.data.shippings;

        return { list: shippings };

    }
);

export const createShippingAction: any = createAction(
    'SHIPPING/ADD_SHIPPING',
    async (data: any) => (dispatch: Type.Dispatch, getState: () => State.Root) => {
        const state = getState();

        axios.post(`${url}/create`, data, {
            headers: {
                ...authHeader(state.user.user.email)
            }
        }).then(result => {
            dispatch(fetchShippingsAction())
            dispatch(setSuccessToastAction('Shipping has been created'))

        }).catch(error => {
            dispatch(
                setErrorToastAction('Shipping already exists')
            );

        })

    }

)

export const updateShippingAction: any = createAction(
    'SHIPPING/UPDATE_SHIPPING',
    async (id: number, data: any) => (dispatch: Type.Dispatch, getState: () => State.Root) => {
        const state = getState();

        axios.post(`${url}/update/${id}`, data, {
            headers: {
                ...authHeader(state.user.user.email)
            }
        }).then(result => {
            dispatch(setSuccessToastAction('Shipping has been updated'));
            dispatch(fetchShippingAction(id));

        }).catch(error => {
            dispatch(
                setErrorToastAction('Shipping already exists')
            );

        })

    }

)

export const deleteShippingAction: any = createAction(
    'SHIPPING/DELETE_SHIPPING',
    async (id: number) => (dispatch: Type.Dispatch, getState: () => State.Root) => {
        const state = getState();

        axios.delete(`${url}/delete/${id}`, {
            headers: {
                ...authHeader(state.user.user.email)
            }
        }).then(result => {
            dispatch(
                setSuccessToastAction('Shipping has been deleted')
            );


        })

    }

)
