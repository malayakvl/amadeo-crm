import { Action, handleActions } from 'redux-actions';
import {
    fetchItemsAction,
    fetchItemAction,
    showLoginFormAction,
    showPopupAction,
    fetchFilerItems,
    showDateSelectorAction,
    setSelectedSellerAction
} from './actions';

const initialState: {
    isFetched: boolean;
    loading: boolean;
    count: number;
    items: Orders.DataItem[];
    item: any;
    showPopup: boolean;
    fileterData: any;
    showDateSelector: boolean;
    showLoginForm: boolean;
    selectedSeller: string;
} = {
    isFetched: false,
    loading: false,
    count: 0,
    items: [],
    item: {},
    showPopup: false,
    fileterData: {
        total_orders: [],
        total_buyers: [],
        total_sessions: [],
        countries: [],
        shippings: [],
        amounts: []
    },
    showDateSelector: false,
    showLoginForm: false,
    selectedSeller: ''
};

const ACTION_HANDLERS: any = {
    [fetchItemsAction]: {
        next: (
            state: State.Sellers,
            action: Type.ReduxAction<Pick<State.Sellers, 'count' | 'items'>>
        ): State.Sellers => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Sellers): State.Sellers => ({
            ...state,
            loading: false,
            isFetched: false
        })
    },
    // [fetchItemAction]: {
    //     next: (
    //         state: State.Orders,
    //         action: Type.ReduxAction<Pick<State.Orders, 'item'>>
    //     ): State.Orders => ({
    //         ...state,
    //         ...action.payload,
    //         loading: false,
    //         isFetched: true
    //     }),
    //     throw: (state: State.Orders): State.Orders => ({
    //         ...state,
    //         loading: false,
    //         isFetched: true
    //     })
    // },
    [fetchFilerItems]: {
        next: (
            state: State.Sellers,
            action: Type.ReduxAction<Pick<State.Sellers, 'fileterData'>>
        ): State.Sellers => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Sellers): State.Sellers => ({
            ...state,
            loading: false,
            isFetched: true
        })
    },
    [showPopupAction]: {
        next: (state: State.Sellers, action: Action<boolean>): State.Sellers => ({
            ...state,
            showPopup: action.payload
        })
    },
    [showLoginFormAction]: {
        next: (state: State.Sellers, action: Action<boolean>): State.Sellers => ({
            ...state,
            showLoginForm: action.payload
        })
    },
    [showDateSelectorAction]: {
        next: (state: State.Sellers, action: Action<boolean>): State.Sellers => ({
            ...state,
            showDateSelector: action.payload
        })
    },
    [setSelectedSellerAction]: {
        next: (state: State.Sellers, action: Action<string>): State.Sellers => ({
            ...state,
            selectedSeller: action.payload
        })
    }
};

export {
    fetchItemsAction,
    fetchItemAction,
    showPopupAction,
    showLoginFormAction,
    fetchFilerItems,
    showDateSelectorAction,
    setSelectedSellerAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
