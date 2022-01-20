import { createAction } from 'redux-actions';
import { authHeader } from '../../lib/functions';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
import { setSuccessToastAction } from '../layouts';
import { paginationSelectorFactory } from '../layouts/selectors';
import { PaginationType } from '../../constants';
import queryString from 'query-string';
import { showLoaderAction } from '../layouts/actions';

export const updateFormAction: any = createAction(
    'chatbot/ADD_UPDATE_DATA',
    async (data: any, id: number | null | undefined) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            const isNew = id;
            dispatch(showLoaderAction(true));
            return axios
                .post(`${baseUrl}/chatbot`, data, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then(async () => {
                    dispatch(
                        setSuccessToastAction(`Message has been ${isNew ? 'updated' : 'created'}`)
                    );
                    dispatch(fetchDataAction());
                    dispatch(showLoaderAction(false));
                });
        }
);
export const fetchDataAction: any = createAction(
    'chatbot/FETCH_ITEMS',
    async (type: string) =>
        (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{ count: any; items: any }> => {
            const state = getState();
            const { limit, offset, sort, column, query, filters } = paginationSelectorFactory(
                PaginationType.CHATBOT
            )(state);
            const queryFilter = JSON.stringify(type === 'system' ? { type: 'system' } : filters);
            dispatch(showLoaderAction(true));
            return axios
                .get(
                    `${baseUrl}/fetch-chatbot-messages?type=${type}&${queryString.stringify({
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
export const fetchDataSystemAction: any = createAction(
    'chatbot/FETCH_SYSTEM_ITEMS',
    async () =>
        (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{ count: number; itemsSystem: any }> => {
            const state = getState();
            const { limit, offset, sort, column, query } = paginationSelectorFactory(
                PaginationType.CHATBOT
            )(state);
            const queryFilter = JSON.stringify({ type: 'system' });
            dispatch(showLoaderAction(true));
            return axios
                .get(
                    `${baseUrl}/fetch-chatbot-default-messages?${queryString.stringify({
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
                        itemsSystem: res.data.items,
                        count: res.data.count
                    };
                });
        }
);
export const fetchFormAction: any = createAction(
    'chatbot/FETCH_ITEM',
    async (id: number) =>
        async (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{ item: Products.Product }> => {
            const state = getState();
            dispatch(showLoaderAction(true));
            const res = await axios.get(`${baseUrl}/fetch-chatbot-message/${id}`, {
                headers: {
                    ...authHeader(state.user.user.email)
                }
            });
            if (res.status) {
                dispatch(showLoaderAction(false));
            }
            return {
                item: res.data.item
            };
        }
);
