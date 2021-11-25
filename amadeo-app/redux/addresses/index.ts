import { Action, handleActions } from 'redux-actions';
import {
    fetchAddressesAction,
    fetchAddressAction,
    setAddressAction
} from './actions';
// import Addresses = State.Addresses;


const initialState: State.Addresses = {
    addresses: [],
    address: {} as Addresses.Address
};

const ACTION_HANDLERS: any = {
    [fetchAddressesAction]: {
        next: (state: State.Addresses, action: Action<any>): State.Addresses => ({
            ...state,
            addresses: action.payload,
        }),
    },
    [fetchAddressAction]: {
        next: (state: State.Addresses, action: Action<any>): State.Addresses => ({
            ...state,
            address: action.payload,
        }),
    },
    [setAddressAction]: (state: State.Addresses, action: Action<Addresses.Address>): State.Addresses => ({
        ...state,
        address: action.payload,
    }),
};

export {
    fetchAddressesAction,
    fetchAddressAction,
    setAddressAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
