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

export const fetchAdditionalAction: any = createAction(
    'products/FETCH_ADDITIONAL',
    async () =>
        async (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{ additional: any }> => {
            const state = getState();
            const res = await axios.get(`${baseUrl}/products/fetch-additional`, {
                headers: {
                    ...authHeader(state.user.user.email)
                }
            });
            return res.data;
        }
);
export const updateProductAction: any = createAction(
    'product/ADD_UPDATE_PRODUCT',
    async (data: any, id: number | null | undefined) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            const isNew = id;
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
                    dispatch(fetchAdditionalAction());
                    dispatch(fetchProductsAction());
                    dispatch(setActiveTabAction('products'));
                });
        }
);
export const importProductAction: any = createAction(
    'product/IMPORT_PRODUCT',
    async (data: any, id: number | null | undefined) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            const isNew = id;
            return axios
                .post(`${baseUrl}/products/import`, data, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then(async () => {
                    dispatch(
                        setSuccessToastAction(`Product has been ${isNew ? 'updated' : 'created'}`)
                    );
                    dispatch(fetchAdditionalAction());
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
            const { limit, offset, sort, column, query, filters } = paginationSelectorFactory(
                PaginationType.PRODUCTS
            )(state);
            const queryFilter = JSON.stringify(filters);
            return axios
                .get(
                    `${baseUrl}/fetch-products?${queryString.stringify({
                        limit,
                        offset,
                        sort,
                        column,
                        query,
                        queryFilter
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
export const findTagAction: any = createAction(
    'products/FIND_TAG',
    async (query: string) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            return axios
                .get(`${baseUrl}/tags/find?tag=${query}`, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then((res: any) => res.data.result);
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
export const copyProductAction: any = createAction(
    'products/COPY_PRODUCT',
    async (id: number) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            return axios
                .get(`${baseUrl}/products/copy/${id}`, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then(async () => {
                    await dispatch(fetchProductsAction());
                    dispatch(setSuccessToastAction('Product has been copied'));
                });
        }
);
export const removeProductFileAction: any = createAction(
    'products/REMOVE_PRODUCT_FILE',
    async (file: string, id: number) =>
        async (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            return axios
                .post(
                    `${baseUrl}/products/photo-delete/${id}`,
                    { data: file },
                    {
                        headers: {
                            ...authHeader(state.user.user.email)
                        }
                    }
                )
                .then(async () => {
                    await dispatch(fetchProductsAction());
                    dispatch(setSuccessToastAction('Photo has been deleted'));
                });
        }
);
export const bulkDeleteAction: any = createAction(
    'products/BULK_DELETE',
    async () =>
        async (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            return axios
                .post(
                    `${baseUrl}/products/bulk-delete`,
                    { data: JSON.stringify(state.layouts.checkedIds) },
                    {
                        headers: {
                            ...authHeader(state.user.user.email)
                        }
                    }
                )
                .then(async () => {
                    dispatch(setSuccessToastAction('Products has been deleted'));
                    await dispatch(fetchProductsAction());
                });
        }
);
export const bulkCopyAction: any = createAction(
    'products/BULK_COPY',
    async () =>
        async (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            return axios
                .post(
                    `${baseUrl}/products/bulk-copy`,
                    { data: JSON.stringify(state.layouts.checkedIds) },
                    {
                        headers: {
                            ...authHeader(state.user.user.email)
                        }
                    }
                )
                .then(async () => {
                    dispatch(setSuccessToastAction('Products has been copied'));
                    await dispatch(fetchProductsAction());
                });
        }
);

export const addUploadedFile: any = createAction('products/ADD_UPLOADED_FILE');
export const removeUploadedFile: any = createAction('products/REMOVE_UPLOADED_FILE');
export const setActiveTabAction: any = createAction('products/SET_ACTIVE_TAB');
export const setEmptyProductAction: any = createAction('products/SET_EMPTY');
export const setSelectedColorsAction: any = createAction('products/SET_COLORS');
export const setSelectedSizesAction: any = createAction('products/SET_SIZES');
export const setSelectedAdditionalAction: any = createAction(
    'products/SET_PRODUCT_SELECTED_ADDITIONAL'
);
export const setIdentAction: any = createAction('layouts/SET_IDENT_VARIANT');
