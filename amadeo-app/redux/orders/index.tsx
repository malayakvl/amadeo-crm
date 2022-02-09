import { Action, handleActions } from 'redux-actions';
import { fetchItemsAction, fetchItemAction, setEmptyFormAction, showPopupAction } from './actions';

const initialState: {
    isFetched: boolean;
    loading: boolean;
    count: number;
    items: Orders.DataItem[];
    item: any;
    showPopup: boolean;
} = {
    isFetched: false,
    loading: false,
    count: 0,
    items: [],
    item: {},
    showPopup: false
};

const ACTION_HANDLERS: any = {
    [fetchItemsAction]: {
        next: (
            state: State.Orders,
            action: Type.ReduxAction<Pick<State.Orders, 'count' | 'items'>>
        ): State.Orders => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Orders): State.Orders => ({
            ...state,
            loading: false,
            isFetched: false
        })
    },
    [fetchItemAction]: {
        next: (
            state: State.Orders,
            action: Type.ReduxAction<Pick<State.Orders, 'item'>>
        ): State.Orders => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Orders): State.Orders => ({
            ...state,
            loading: false,
            isFetched: true
        })
    },
    // [setEmptyFormAction]: {
    //     next: (state: State.Orders): State.Orders => ({
    //         ...state,
    //         item: {
    //             id: null,
    //             name: '',
    //             keywords: '',
    //             message_fr: '',
    //             message_en: '',
    //             active: true,
    //             product: null,
    //             discount: '',
    //             answer_count: '',
    //             created_at: null,
    //             updated_at: null
    //         }
    //     })
    // },
    [showPopupAction]: {
        next: (state: State.Orders, action: Action<boolean>): State.Orders => ({
            ...state,
            showPopup: action.payload
        })
    }
};

export { fetchItemsAction, fetchItemAction, showPopupAction, setEmptyFormAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
