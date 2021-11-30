import { Action, handleActions } from 'redux-actions';
import {
    fetchUserAction,
    setUserAction
} from './actions';

const initialState: State.User = {
    user: {} as User.User,
};

const ACTION_HANDLERS: any = {
    [fetchUserAction]: {
        next: (state: State.User, action: Action<any>): State.User => ({
            ...state,
            user: action.payload,
        }),
    },
    [setUserAction]: {
        next: (state: State.User, action: Action<any>): State.User => ({
            ...state,
            user: action.payload,
        }),
    },
};

export {
    fetchUserAction,
    setUserAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
