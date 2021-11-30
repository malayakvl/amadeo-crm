import { Action, handleActions } from 'redux-actions';
import {
    fetchProfileAction,
    updateProfileAction,
    setCrudStatusAction,
    changePasswordAction,
    restorePasswordAction,
    setValidEmailStatusAction
} from './actions';


const initialState: State.Profile = {
    profile: {} as Profile.Profile,
    crudStatus: null,
    validEmail: null
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
        next: (state: State.Profile, action: Action<any>): State.Profile => ({
            ...state,
            crudStatus: action.payload,
        }),
    },
    [changePasswordAction]: {
        next: (state: State.Profile, action: Action<any>): State.Profile => ({
            ...state,
            crudStatus: action.payload,
        }),
    },
    [restorePasswordAction]: {
        next: (state: State.Profile, action: Action<any>): State.Profile => ({
            ...state,
            validEmail: action.payload,
        }),
    },
    [setValidEmailStatusAction]: {
        next: (state: State.Profile, action: Action<any>): State.Profile => ({
            ...state,
            crudStatus: action.payload,
        }),
    },
};

export {
    fetchProfileAction,
    updateProfileAction,
    setCrudStatusAction,
    changePasswordAction,
    restorePasswordAction,
    setValidEmailStatusAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
