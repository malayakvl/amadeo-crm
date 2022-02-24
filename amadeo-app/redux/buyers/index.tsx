import { Action, handleActions } from 'redux-actions';
import {
    fetchItemsAction,
    // fetchOrdersAction,
    showPopupAction,
    fetchFilerItems,
    showDateSelectorAction
} from './actions';

const initialState: {
    isFetched: boolean;
    loading: boolean;
    count: number;
    items: Buyers.DataItem[];
    // orders: Orders.DataItem[][];
    // orders: Record<number, Orders.DataItem[]>;
    showPopup: boolean;
    fileterData: any;
    // showDateSelector: boolean;
} = {
    isFetched: false,
    loading: false,
    count: 0,
    items: [],
    // orders: [],
    showPopup: false,
    fileterData: {
        name: '',
        countries: [],
        // shippings: [],
        amounts: []
    }
    // ,showDateSelector: false
};

const ACTION_HANDLERS: any = {
    [fetchItemsAction]: {
        next: (
            state: State.Buyers,
            action: Type.ReduxAction<Pick<State.Buyers, 'count' | 'items'>>
        ): State.Buyers => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Buyers): State.Buyers => ({
            ...state,
            loading: false,
            isFetched: false
        })
    },
    // [fetchOrdersAction]: {
    //     next: (
    //         state: State.Buyers,
    //         action: Type.ReduxAction<Pick<State.Buyers, 'orders'>>
    //     ): State.Buyers => ({
    //         ...state,
    //         ...action.payload,
    //         loading: false,
    //         isFetched: true
    //     }),
    //     throw: (state: State.Buyers): State.Buyers => ({
    //         ...state,
    //         loading: false,
    //         isFetched: true
    //     })
    // },
    [fetchFilerItems]: {
        next: (
            state: State.Buyers,
            action: Type.ReduxAction<Pick<State.Buyers, 'fileterData'>>
        ): State.Buyers => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Buyers): State.Buyers => ({
            ...state,
            loading: false,
            isFetched: true
        })
    },
    [showPopupAction]: {
        next: (state: State.Buyers, action: Action<boolean>): State.Buyers => ({
            ...state,
            showPopup: action.payload
        })
    },
    [showDateSelectorAction]: {
        next: (state: State.Buyers, action: Action<boolean>): State.Buyers => ({
            ...state,
            showDateSelector: action.payload
        })
    }
};

export {
    fetchItemsAction,
    // fetchOrdersAction,
    showPopupAction,
    fetchFilerItems,
    showDateSelectorAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);