import { Action, handleActions } from 'redux-actions';
import {
    fetchProfileAction,
    updateProfileAction,
    setCrudStatusAction
} from './actions';


const initialState: State.Profile = {
    profile: {} as Profile.Profile,
    crudStatus: null
};

const ACTION_HANDLERS: any = {
    [fetchProfileAction]: {
        next: (state: State.Profile, action: Action<any>): State.Profile => ({
            ...state,
            profile: action.payload,
        }),
    },
    [updateProfileAction]: {
        next: (state: State.Profile, action: Action<any>): State.Profile => ({
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
};

export {
    fetchProfileAction,
    updateProfileAction,
    setCrudStatusAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
