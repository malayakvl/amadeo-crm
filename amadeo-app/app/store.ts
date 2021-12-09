import { ThunkAction, Action } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxPromise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

import addressReducer from '../redux/addresses/index';
import profileReducer from '../redux/profile/index';
import userReducer from '../redux/user/index';
import notificationsReducer from '../redux/notifications/index';

const reducers = combineReducers({
    addresses: addressReducer,
    profile: profileReducer,
    user: userReducer,
    notifications: notificationsReducer
});

const initStore = (initialState = {}) => {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware, logger, reduxPromise))
    );
};

const store = initStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;

export default store;