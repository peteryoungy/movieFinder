import { configureStore } from "@reduxjs/toolkit";
import UserPosReducer from "./reducers/UserPosReducer";

const store = configureStore({
    reducer: {
        user_pos: UserPosReducer
    }
})

export default store;