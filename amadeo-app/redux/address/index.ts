import { Action, handleActions } from 'redux-actions';
import {
    fetchAddressAction,
    setAddressAction,
    addAddressAction,
} from './actions';

const initialState: Addresses.Address = {
    id: null,
    user_id: null,
    country_id: null,
    state: null,
    post_code: null,
    address_type: null,
    city: null,
    address_line_1: null,
    address_line_2: null,
    created_at: null,
    updated_at: null,
};

const ACTION_HANDLERS: any = {
    [fetchAddressAction]: {
        next: (
            state: State.Addresses,
            action: Type.ReduxAction<Pick<State.Addresses, 'address'>>
        ): State.Addresses => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Addresses): State.Addresses => ({
            ...state,
            loading: false,
            isFetched: true
        })
    },
    [setAddressAction]: (
        state: State.Addresses,
        action: Action<Addresses.Address>
    ): State.Addresses => ({
        ...state,
        address: action.payload
    })
};

export {
    fetchAddressAction,
    setAddressAction,
    addAddressAction,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
