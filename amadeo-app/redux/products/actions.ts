import { createAction } from 'redux-actions';
import { authHeader } from '../../lib/functions';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
import { setSuccessToastAction } from '../layouts';

export const fetchColorSizesAction: any = createAction(
    'products/FETCH_COLORS_SIZES',
    async () =>
        async (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{ colors: any; sizes: any }> => {
            const state = getState();
            const res = await axios.get(`${baseUrl}/products/fetch-colors-and-sizes`, {
                headers: {
                    ...authHeader(state.user.user.email)
                }
            });
            return {
                colors: res.data.colors,
                sizes: res.data.sizes
            };
        }
);
export const updateProductAction: any = createAction(
    'product/ADD_UPDATE_PRODUCT',
    async (data: any) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            const isNew = data.id;
            return axios
                .post(`${baseUrl}/product`, data, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then(async () => {
                    dispatch(
                        setSuccessToastAction(`Product has been ${isNew ? 'updated' : 'created'}`)
                    );
                });
        }
);
