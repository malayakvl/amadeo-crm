import { Action, handleActions } from 'redux-actions';
import {
    fetchProfileAction,
    updateProfileAction,
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
        next: (
            state: State.Notifications,
            action: Type.ReduxAction<Pick<State.Profile, 'profile'>>
        ): State.Notifications => ({
            ...state,
            ...action.payload
        }),
        throw: (state: State.Notifications): State.Notifications => ({
            ...state
        })
    },
    [changePasswordAction]: {
        next: (state: State.Profile, action: Action<any>): State.Profile => ({
            ...state,
            crudStatus: action.payload
        })
    },
    [restorePasswordAction]: {
        next: (state: State.Profile, action: Action<any>): State.Profile => ({
            ...state,
            validEmail: action.payload
        })
    },
    [setValidEmailStatusAction]: {
        next: (state: State.Profile, action: Action<any>): State.Profile => ({
            ...state,
            crudStatus: action.payload
        })
    }
};

export {
    fetchProfileAction,
    updateProfileAction,
    changePasswordAction,
    restorePasswordAction,
    setValidEmailStatusAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
