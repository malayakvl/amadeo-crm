import { Action, handleActions } from 'redux-actions';
import {
    fetchAddressesAction,
    fetchAddressAction,
    setAddressAction,
    addAddressAction,
    deleteAddressAction
} from './actions';

const initialState: State.Addresses = {
    addresses: [],
    address: {} as Addresses.Address,
    crudStatus: null,
    loading: false,
    isFetched: false
};

const ACTION_HANDLERS: any = {
    [fetchAddressesAction]: {
        next: (
            state: State.Addresses,
            action: Type.ReduxAction<Pick<State.Addresses, 'addresses'>>
        ): State.Notifications => ({
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
    [fetchAddressAction]: {
        next: (
            state: State.Addresses,
            action: Type.ReduxAction<Pick<State.Addresses, 'address'>>
        ): State.Notifications => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Notifications): State.Addresses => ({
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
    // [setCrudStatusAction]: {
    //     next: (state: State.Addresses, action: Action<any>): State.Addresses => ({
    //         ...state,
    //         crudStatus: action.payload
    //     })
    // },
    // [deleteAddressAction]: {
    //     next: (state: State.Addresses, action: Action<any>): State.Addresses => ({
    //         ...state,
    //         crudStatus: action.payload
    //     })
    // }
};

export {
    fetchAddressesAction,
    fetchAddressAction,
    setAddressAction,
    addAddressAction,
    deleteAddressAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
