/*
 * Developed by Prishan Maduka on 3/29/22, 2:59 PM
 * Last modified 3/29/22, 2:59 PM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage : AsyncStorage,
};

const cfgStore = () => {
    const middleWares = [thunk];
    const enhancer = applyMiddleware(...middleWares);
    const persistedReducer = persistReducer(persistConfig, reducers);

    // create store
    return createStore(persistedReducer, enhancer);
};

export const persistore = persistStore(cfgStore());

export default cfgStore;

