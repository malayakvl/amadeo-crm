import { createAction } from 'redux-actions';
import { authHeader, toggleModalConfirmation } from '../../lib/functions';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
import { setSuccessToastAction } from '../layouts';
import { paginationSelectorFactory } from '../layouts/selectors';
import { PaginationType } from '../../constants';
import queryString from 'query-string';

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
                    dispatch(fetchProductsAction());
                    dispatch(setActiveTabAction('products'));
                });
        }
);

export const fetchProductsAction: any = createAction(
    'products/FETCH_PRODUCTS',
    async () =>
        (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{ count: any; items: any }> => {
            const state = getState();
            const { limit, offset, sort, column, query } = paginationSelectorFactory(
                PaginationType.PRODUCTS
            )(state);
            return axios
                .get(
                    `${baseUrl}/fetch-products?${queryString.stringify({
                        limit,
                        offset,
                        sort,
                        column,
                        query
                    })}`,
                    {
                        headers: {
                            ...authHeader(state.user.user.email)
                        }
                    }
                )
                .then((res: any) => ({
                    count: res.data.count,
                    items: res.data.items
                }));
        }
);
export const fetchProductAction: any = createAction(
    'products/FETCH_PRODUCT',
    async (id: number) =>
        async (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{ product: Products.Product }> => {
            const state = getState();
            const res = await axios.get(`${baseUrl}/fetch-product/${id}`, {
                headers: {
                    ...authHeader(state.user.user.email)
                }
            });
            return {
                product: res.data.product
            };
        }
);
export const deleteProductAction: any = createAction(
    'products/DELETE_PRODUCT',
    async (id: number) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            return axios
                .delete(`${baseUrl}/products/delete/${id}`, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then(async () => {
                    await dispatch(fetchProductsAction());
                    dispatch(setSuccessToastAction('Product has been deleted'));
                    dispatch(setActiveTabAction('products'));
                    toggleModalConfirmation();
                });
        }
);

export const addUploadedFile: any = createAction('products/ADD_UPLOADED_FILE');
export const removeUploadedFile: any = createAction('products/REMOVE_UPLOADED_FILE');
export const bulkDeleteAction: any = createAction('products/BULK_DELETE');
export const setActiveTabAction: any = createAction('products/SET_ACTIVE_TAB');
export const setEmptyProductAction: any = createAction('products/SET_EMPTY');
export const setSelectedColorsAction: any = createAction('products/SET_COLORS');
export const setSelectedSizesAction: any = createAction('products/SET_SIZES');
