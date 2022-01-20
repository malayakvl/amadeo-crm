import { ThunkAction, Action } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxPromise from 'redux-promise';
// import thunkMiddleware from 'redux-thunk';
import reduxThunkFsa from 'redux-thunk-fsa';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

import addressReducer from '../redux/address';
import profileReducer from '../redux/profile/index';
import userReducer from '../redux/user/index';
import notificationsReducer from '../redux/notifications/index';
import layoutsReducer from '../redux/layouts/index';
import productsReducer from '../redux/products/index';
import chatbotReducer from '../redux/chatbot/index';

const reducers = combineReducers({
    address: addressReducer,
    profile: profileReducer,
    user: userReducer,
    notifications: notificationsReducer,
    layouts: layoutsReducer,
    products: productsReducer,
    chatbot: chatbotReducer
});

const initStore = (initialState = {}) => {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(reduxThunkFsa, logger, reduxPromise))
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
