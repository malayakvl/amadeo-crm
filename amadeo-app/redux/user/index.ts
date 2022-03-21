import { Action, handleActions } from 'redux-actions';
import {
    fetchUserAction,
    setUserAction,
    hideRegisterFormAction,
    createExistUserSubscriptionAction,
    createUserFromSubscriptionAction,
    checkPaymentStatusAction,
    fetchUserSubscriptionAction
} from './actions';

// const initialState: State.User = {
//     user: {} as User.User,
//     hideRegisterFrom: false,
//     subscription: {},
//
// };
const initialState: {
    clientSecret: null;
    subscription: null;
    user: User.User;
    paymentIntent: null;
} = {
    user: {} as User.User,
    clientSecret: null,
    subscription: null,
    paymentIntent: null
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
    },
    [createExistUserSubscriptionAction]: {
        next: (
            state: State.User,
            action: Type.ReduxAction<Pick<State.User, 'subscription' | 'clientSecret'>>
        ): State.User => ({
            ...state,
            ...action.payload
        }),
        throw: (state: State.User): State.User => ({
            ...state
        })
    },
    [createUserFromSubscriptionAction]: {
        next: (
            state: State.User,
            action: Type.ReduxAction<Pick<State.User, 'subscription' | 'clientSecret'>>
        ): State.User => ({
            ...state,
            ...action.payload
        }),
        throw: (state: State.User): State.User => ({
            ...state
        })
    },
    [checkPaymentStatusAction]: {
        next: (
            state: State.User,
            action: Type.ReduxAction<Pick<State.User, 'paymentIntent'>>
        ): State.User => ({
            ...state,
            ...action.payload
        }),
        throw: (state: State.User): State.User => ({
            ...state
        })
    },
    [fetchUserSubscriptionAction]: {
        next: (
            state: State.User,
            action: Type.ReduxAction<Pick<State.User, 'subscription'>>
        ): State.User => ({
            ...state,
            ...action.payload
        }),
        throw: (state: State.User): State.User => ({
            ...state
        })
    }
};

export {
    fetchUserAction,
    setUserAction,
    hideRegisterFormAction,
    createExistUserSubscriptionAction,
    createUserFromSubscriptionAction,
    checkPaymentStatusAction,
    fetchUserSubscriptionAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
