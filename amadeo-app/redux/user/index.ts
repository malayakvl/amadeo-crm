import { Action, handleActions } from 'redux-actions';
import { fetchUserAction, setUserAction, hideRegisterFormAction } from './actions';

const initialState: State.User = {
    user: {} as User.User,
    hideRegisterFrom: false
};

const ACTION_HANDLERS: any = {
    [fetchUserAction]: {
        next: (state: State.User, action: Action<any>): State.User => ({
            ...state,
            user: action.payload
        })
    },
    [setUserAction]: {
        next: (state: State.User, action: Action<any>): State.User => ({
            ...state,
            user: action.payload
        })
    },
    [hideRegisterFormAction]: {
        next: (state: State.User, action: Action<any>): State.User => ({
            ...state,
            hideRegisterFrom: action.payload
        })
    }
};

export { fetchUserAction, setUserAction, hideRegisterFormAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
