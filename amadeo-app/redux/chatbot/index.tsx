import { handleActions } from 'redux-actions';
import { fetchDataAction, fetchFormAction, fetchDataSystemAction } from './actions';

const initialState: {
    isFetched: boolean;
    count: number;
    loading: boolean;
    items: Chatbot.ChatbotItem[];
    itemsSystem: Chatbot.ChatbotItem[];
    item: Chatbot.ChatbotItem;
} = {
    loading: false,
    isFetched: false,
    count: 0,
    items: [],
    itemsSystem: [],
    item: {
        id: null,
        name: '',
        trigger: '',
        description_fr: '',
        description_en: '',
        active: true,
        created_at: null,
        updated_at: null
    }
};

const ACTION_HANDLERS: any = {
    [fetchDataAction]: {
        next: (
            state: State.Chatbot,
            action: Type.ReduxAction<Pick<State.Chatbot, 'count' | 'items'>>
        ): State.Chatbot => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Chatbot): State.Chatbot => ({
            ...state,
            loading: false,
            isFetched: false
        })
    },
    [fetchDataSystemAction]: {
        next: (
            state: State.Chatbot,
            action: Type.ReduxAction<Pick<State.Chatbot, 'itemsSystem' | 'count'>>
        ): State.Chatbot => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Chatbot): State.Chatbot => ({
            ...state,
            loading: false,
            isFetched: false
        })
    },
    [fetchFormAction]: {
        next: (
            state: State.Chatbot,
            action: Type.ReduxAction<Pick<State.Chatbot, 'item'>>
        ): State.Chatbot => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Chatbot): State.Chatbot => ({
            ...state,
            loading: false,
            isFetched: true
        })
    }
};

export { fetchDataAction, fetchFormAction, fetchDataSystemAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
