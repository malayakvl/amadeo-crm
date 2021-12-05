import { Action, handleActions } from 'redux-actions';
import { fetchCntNewAction, fetchNewListAction } from './actions';

const initialState: State.Notifications = {
    cntNew: 0,
    notificationsLatest: [],
    notifications: [],
    notification: {} as Notifications.Notification
};

const ACTION_HANDLERS: any = {
    [fetchCntNewAction]: {
        next: (state: State.Notifications, action: Action<any>): State.Notifications => ({
            ...state,
            cntNew: action.payload
        })
    },
    [fetchNewListAction]: {
        next: (state: State.Notifications, action: Action<any>): State.Notifications => ({
            ...state,
            notificationsLatest: action.payload
        })
    }
};

export { fetchCntNewAction, fetchNewListAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
