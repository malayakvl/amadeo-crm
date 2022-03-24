import { createAction } from 'redux-actions';
import { authHeader } from '../../lib/functions';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
import queryString from 'query-string';
import { setErrorToastAction, showLoaderAction } from '../layouts/actions';

export const fetchCheckoutAction: any = createAction(
    'checkout/FETCH',
    async (orderNumber: string) =>
        (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{
            order: Orders.DataItem;
            address: Profile.Address;
            shippingMethods: ShippingMethod[];
        }> => {
            const state = getState();
            dispatch(showLoaderAction(true));
            return axios
                .get(
                    `${baseUrl}/checkout?${queryString.stringify({
                        orderNumber
                    })}`,
                    {
                        headers: {
                            ...authHeader(state.user.user.email)
                        }
                    }
                )
                .then((res: any) => {
                    dispatch(showLoaderAction(false));
                    return {
                        order: res.data.order,
                        address: res.data.address,
                        shippingMethods: res.data.shippingMethods
                    };
                });
        }
);

export const fetchShippingMethodsByCountryCheckoutAction: any = createAction(
    'checkout/FETCH_SHIPPING_METHODS_BY_COUNTRY',
    async (orderId: number, countryId: number) =>
        (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{
            shippingMethods: ShippingMethod[];
        }> => {
            const state = getState();
            dispatch(showLoaderAction(true));
            return axios
                .get(
                    `${baseUrl}/checkout/fetch-shipping-methods?${queryString.stringify({
                        orderId,
                        countryId
                    })}`,
                    {
                        headers: {
                            ...authHeader(state.user.user.email)
                        }
                    }
                )
                .then((res: any) => {
                    dispatch(showLoaderAction(false));
                    return {
                        shippingMethods: res.data.shippingMethods
                    };
                });
        }
);
export const submitCheckoutAction: any = createAction(
    'checkout/SUBMIT_CHECKOUT',
    async (data: any) =>
        async (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{ redirectUrl: string | null }> => {
            dispatch(showLoaderAction(true));
            const state = getState();
            try {
                const res = await axios.post(`${baseUrl}/checkout`, data, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                });
                if (res.status) {
                    dispatch(showLoaderAction(false));
                }
                return {
                    redirectUrl: res.data.redirectUrl
                };
            } catch (e) {
                dispatch(showLoaderAction(false));
                dispatch(setErrorToastAction(`Email present`));
                return {
                    redirectUrl: null
                };
            }
        }
);
