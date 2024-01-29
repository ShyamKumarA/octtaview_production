import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import userReducer from '../Slice/authSlice';
import { useDispatch, TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAddNewUserReducer } from './userSlice';
import { getAddNewFundReducer } from './userSlice';
import { addFundHistoryReducer } from './packageSlice';
import { userProfileReducer } from './userSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    userReducer,
    getAddNewUserReducer,
    getAddNewFundReducer,
    addFundHistoryReducer,
    userProfileReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export default store;
