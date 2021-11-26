import { Action, handleActions } from 'redux-actions';
import {
    fetchAddressesAction,
    fetchAddressAction,
    setAddressAction,
    addAddressAction,
    setCrudStatusAction,
    deleteAddressAction
} from './actions';


const initialState: State.Addresses = {
    addresses: [],
    address: {} as Addresses.Address,
    crudStatus: null
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
    [addAddressAction]: {
        next: (state: State.Addresses, action: Action<any>): State.Addresses => ({
            ...state,
            crudStatus: action.payload,
        }),
    },
    [setCrudStatusAction]: {
        next: (state: State.Addresses, action: Action<any>): State.Addresses => ({
            ...state,
            crudStatus: action.payload,
        }),
    },
    [deleteAddressAction]: {
        next: (state: State.Addresses, action: Action<any>): State.Addresses => ({
            ...state,
            crudStatus: action.payload,
        }),
    },
};

export {
    fetchAddressesAction,
    fetchAddressAction,
    setAddressAction,
    addAddressAction,
    setCrudStatusAction,
    deleteAddressAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
