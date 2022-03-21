import { handleActions } from 'redux-actions';
import { fetchFormAction, stripePaymentIntentAction, paymentPlanInfoAction } from './actions';

const initialState: {
    loading: boolean;
    items: { header: any[]; values: any[] };
    clientSecret: string;
    planInfo: any;
} = {
    loading: false,
    items: { header: [], values: [] },
    clientSecret: '',
    planInfo: null
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
    },
    [paymentPlanInfoAction]: {
        next: (
            state: State.PaymentPlans,
            action: Type.ReduxAction<Pick<State.PaymentPlans, 'planInfo'>>
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

export { fetchFormAction, stripePaymentIntentAction, paymentPlanInfoAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
