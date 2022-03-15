import { handleActions } from 'redux-actions';
import { fetchFormAction, stripePaymentIntentAction } from './actions';

const initialState: {
    loading: boolean;
    items: { header: any[]; values: any[] };
    clientSecret: string;
} = {
    loading: false,
    items: { header: [], values: [] },
    clientSecret: ''
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
    },
    [stripePaymentIntentAction]: {
        next: (
            state: State.PaymentPlans,
            action: Type.ReduxAction<Pick<State.PaymentPlans, 'clientSecret'>>
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

export { fetchFormAction, stripePaymentIntentAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
