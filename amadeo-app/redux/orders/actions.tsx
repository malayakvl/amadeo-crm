import { createAction } from 'redux-actions';
import { authHeader, toggleModalPopup } from '../../lib/functions';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
import { setSuccessToastAction } from '../layouts';
import { paginationSelectorFactory } from '../layouts/selectors';
import { PaginationType } from '../../constants';
import queryString from 'query-string';
import { showLoaderAction } from '../layouts/actions';

export const submitFormAction: any = createAction(
    'orders/ADD_UPDATE_DATA',
    async (data: any) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            const isNew = data.id;
            dispatch(showLoaderAction(true));
            return axios
                .post(`${baseUrl}/livesession`, data, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then(async () => {
                    dispatch(
                        setSuccessToastAction(`Record has been ${isNew ? 'updated' : 'created'}`)
                    );
                    dispatch(setEmptyFormAction());
                    dispatch(fetchItemsAction());
                    dispatch(showPopupAction(false));
                    dispatch(showLoaderAction(false));
                    toggleModalPopup('.modal-schedule');
                });
        }
);
export const fetchItemsAction: any = createAction(
    'orders/FETCH_ITEMS',
    async () =>
        (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{ count: any; items: any }> => {
            const state = getState();
            const { limit, offset, sort, column, query, filters } = paginationSelectorFactory(
                PaginationType.ORDERS
            )(state);
            const queryFilter = JSON.stringify(filters);
            dispatch(showLoaderAction(true));
            return axios
                .get(
                    `${baseUrl}/orders/fetch-items?${queryString.stringify({
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
                .then((res: any) => {
                    dispatch(showLoaderAction(false));
                    return {
                        count: res.data.count,
                        items: res.data.items
                    };
                });
        }
);
export const fetchItemAction: any = createAction(
    'orders/FETCH_ITEM',
    async (id: number) =>
        async (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{ item: Livesessions.DataItem }> => {
            const state = getState();
            dispatch(showLoaderAction(true));
            const res = await axios.get(`${baseUrl}/orders/${id}`, {
                headers: {
                    ...authHeader(state.user.user.email)
                }
            });
            if (res.status) {
                dispatch(showLoaderAction(false));
                // dispatch(showItemAction(true));
            }
            return {
                item: res.data.item
            };
        }
);

export const showPopupAction: any = createAction('orders/SHOW_POPUP');
export const setEmptyFormAction: any = createAction('orders/EMPTY_FORM');
// export const showItemAction: any = createAction('orders/CHATBOT_SHOWITEM');
