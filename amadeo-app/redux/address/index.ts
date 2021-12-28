import { Action, handleActions } from 'redux-actions';
import {
    fetchAddressAction,
    setAddressAction,
    addAddressAction,
} from './actions';

const initialState: Address.Root = {
    id: null,
    user_id: null,
    country_id: 1,
    state: '',
    post_code: '',
    address_type: '',
    city: '',
    address_line_1: '',
    address_line_2: '',
    created_at: null,
    updated_at: null,
};

const ACTION_HANDLERS: any = {
    [fetchAddressAction]: {
        next: (
            state: State.Address,
            action: Type.ReduxAction<State.Address>
        ): State.Address => ({
            ...state,
            ...action.payload
        }),
        throw: (state: State.Address): State.Address => ({
            ...state,
        })
    },
    [setAddressAction]: (
        state: State.Address,
        action: Action<State.Address>
    ): State.Address => ({
        ...state,
        ...action.payload
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
