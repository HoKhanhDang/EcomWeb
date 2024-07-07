import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import appSlice from './appSlice';
import userSlice from '../redux/user/userSlice';


const persistConfig = {
    key: 'shop/user',
    storage,
    
  }

export const rootStore = configureStore({
    reducer: {
        app: appSlice,
        user: persistReducer(persistConfig,userSlice),
    }
});
export const persistor = persistStore(rootStore);

