import axios from 'axios';
import { createAction } from 'redux-actions';
import { authHeader } from '../../lib/functions';
import getConfig from 'next/config';
import { setSuccessToastAction, setErrorToastAction } from '../layouts/actions'

const { publicRuntimeConfig } = getConfig();
const url = `${publicRuntimeConfig.apiUrl}/api/shipping`;

export const fetchShippingAction: any = createAction(
    'SHIPMENT/FETCH_SHIPPING',
    async (dispatch: Type.Dispatch, getState: () => State.Root): Promise<State.Shippings> => {
        return new Promise((resolve) => {
            const result = [
                {
                    id: 1,
                    method: 'method 1',
                    price: 10,
                    enabled: true,
                },
                {
                    id: 2,
                    method: 'method 2',
                    price: 110,
                    enabled: false,
                },
                {
                    id: 3,
                    method: 'method 3',
                    price: 20,
                    enabled: true,
                },
                {
                    id: 4,
                    method: 'method 4',
                    price: 120,
                    enabled: true,
                }

            ]

            resolve(result)
        })
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
            dispatch(
                setSuccessToastAction('Shipping has been created')
            )

        }).catch(error => {
            dispatch(
                setErrorToastAction('Shipping already exists')
            );

        })

    }

)