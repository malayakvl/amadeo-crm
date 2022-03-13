import { handleActions } from 'redux-actions';
import { fetchFormAction } from './actions';

const initialState: {
    loading: boolean;
    items: { header: any[]; values: any[] };
} = {
    loading: false,
    items: { header: [], values: [] }
};

const ACTION_HANDLERS: any = {
    [fetchFormAction]: {
        next: (
            state: State.PaymentPlans,
            action: Type.ReduxAction<Pick<State.PaymentPlans, 'items'>>
        ): State.PaymentPlans => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.PaymentPlans): State.PaymentPlans => ({
            ...state,
            loading: false,
            isFetched: true
        })
    }
};

export { fetchFormAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
