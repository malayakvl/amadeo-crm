import { Action, handleActions } from 'redux-actions';
import { fetchCntNewAction } from './actions';

const initialState: State.Notifications = {
    notifications: [],
    notification: {} as Notifications.Notification,
    cntNew: 0
};

const ACTION_HANDLERS: any = {
    [fetchCntNewAction]: {
        next: (state: State.Notifications, action: Action<any>): State.Notifications => ({
            ...state,
            cntNew: action.payload
        })
    }
};

export { fetchCntNewAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
