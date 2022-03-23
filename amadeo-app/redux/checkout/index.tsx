import { handleActions } from 'redux-actions';
import { fetchCheckoutAction, fetchShippingMethodsByCountryCheckoutAction } from './actions';

const initialState: {
    isFetched: boolean;
    loading: boolean;
    order: Orders.DataItem | null;
    address: Profile.Address | null;
    shippingMethods: ShippingMethod[];
} = {
    isFetched: false,
    loading: false,
    order: null,
    address: null,
    shippingMethods: []
};

const ACTION_HANDLERS: any = {
    [fetchCheckoutAction]: {
        next: (
            state: State.Checkout,
            action: Type.ReduxAction<Pick<State.Checkout, 'order' | 'address' | 'shippingMethods'>>
        ): State.Checkout => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Checkout): State.Checkout => ({
            ...state,
            loading: false,
            isFetched: false
        })
    },

    [fetchShippingMethodsByCountryCheckoutAction]: {
        next: (
            state: State.Checkout,
            action: Type.ReduxAction<Pick<State.Checkout, 'shippingMethods'>>
        ): State.Checkout => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Checkout): State.Checkout => ({
            ...state,
            loading: false,
            isFetched: false
        })
    }
};

export { fetchCheckoutAction, fetchShippingMethodsByCountryCheckoutAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
