import axios from 'axios';
import { createAction } from 'redux-actions';
import { authHeader } from '../../lib/functions';
import getConfig from 'next/config';
import { setSuccessToastAction, setErrorToastAction } from '../layouts';
// import StateManagedSelect from 'react-select';

const { publicRuntimeConfig } = getConfig();
const url = `${publicRuntimeConfig.apiUrl}/api/shipping`;

export const fetchShippingsAction: any = createAction(
    'SHIPMENT/FETCH_SHIPPINGS',
    () =>
        async (dispatch: Type.Dispatch, getState: () => State.Root): Promise<State.Shippings> => {
            const state = getState();

            const response = await axios.get(`${url}/fetch-all`, {
                headers: {
                    ...authHeader(state.user.user.email)
                }
            });

            const shippings: State.Shippings = response.data.shippings;

            return shippings;
        }
);

export const createShippingAction: any = createAction(
    'SHIPPING/ADD_SHIPPING',
    async (data: any) => (dispatch: Type.Dispatch, getState: () => State.Root) => {
        const state = getState();

        axios
            .post(`${url}/create`, data, {
                headers: {
                    ...authHeader(state.user.user.email)
                }
            })
            .then(() => {
                dispatch(setSuccessToastAction('Shipping has been created'));
            })
            .catch(() => {
                dispatch(setErrorToastAction('Shipping already exists'));
            });
    }
);
