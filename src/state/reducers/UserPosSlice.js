import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     lat: 40.7938512,
//     lng: -73.9729092
// }

const initialState = null

const UserPosSlice = createSlice({
    name: "user_pos",
    initialState,
    reducers: {

        setUserPos: (state, action) => {
            // att: though state is an object, we cannot directly change the value of the root state!

            // return action.payload
            
            // att: WRONG
            // const newState = action.payload;
            // state = newState

            return {
                lat: action.payload.lat,
                lng: action.payload.lng
            }
        }
    }
})



export const {setUserPos} = UserPosSlice.actions;

export default UserPosSlice.reducer;

