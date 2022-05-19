import { configureStore } from "@reduxjs/toolkit";
import UserPosReducer from "./reducers/UserPosSlice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import SearchResultSlice from "./reducers/SearchResultSlice";
import SearchKeywordSlice from "./reducers/SearchKeywordSlice";

const reducers = combineReducers({
    user_pos: UserPosReducer,
    search_result: SearchResultSlice,
    search_keyword: SearchKeywordSlice
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export default store;