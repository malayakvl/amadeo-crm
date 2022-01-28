import { Action, handleActions } from 'redux-actions';
import {
    fetchItemsAction,
    fetchItemAction,
    setEmptyFormAction,
    showPopupAction,
    fetchScenariosAction
} from './actions';

const initialState: {
    isFetched: boolean;
    loading: boolean;
    count: number;
    items: Livesessions.DataItem[];
    item: Livesessions.DataItem;
    showPopup: boolean;
    itemScenarios: Livesessions.DataScenario[];
} = {
    isFetched: false,
    loading: false,
    count: 0,
    items: [],
    item: {
        id: null,
        name: '',
        keywords: '',
        message_fr: '',
        message_en: '',
        active: true,
        answer_count: '',
        product: null,
        discount: '',
        created_at: null,
        updated_at: null
    },
    showPopup: false,
    itemScenarios: []
};

const ACTION_HANDLERS: any = {
    [fetchScenariosAction]: {
        next: (
            state: State.Livesessions,
            action: Type.ReduxAction<Pick<State.Livesessions, 'itemScenarios'>>
        ): State.Livesessions => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Livesessions): State.Livesessions => ({
            ...state,
            loading: false,
            isFetched: false
        })
    },
    [fetchItemsAction]: {
        next: (
            state: State.Livesessions,
            action: Type.ReduxAction<Pick<State.Livesessions, 'count' | 'items'>>
        ): State.Livesessions => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Livesessions): State.Livesessions => ({
            ...state,
            loading: false,
            isFetched: false
        })
    },
    [fetchItemAction]: {
        next: (
            state: State.Livesessions,
            action: Type.ReduxAction<Pick<State.Livesessions, 'item'>>
        ): State.Livesessions => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Livesessions): State.Livesessions => ({
            ...state,
            loading: false,
            isFetched: true
        })
    },
    [setEmptyFormAction]: {
        next: (state: State.Livesessions): State.Livesessions => ({
            ...state,
            item: {
                id: null,
                name: '',
                keywords: '',
                message_fr: '',
                message_en: '',
                active: true,
                product: null,
                discount: '',
                answer_count: '',
                created_at: null,
                updated_at: null
            }
        })
    },
    [showPopupAction]: {
        next: (state: State.Livesessions, action: Action<boolean>): State.Livesessions => ({
            ...state,
            showPopup: action.payload
        })
    }
};

export {
    fetchItemsAction,
    fetchItemAction,
    showPopupAction,
    setEmptyFormAction,
    fetchScenariosAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
