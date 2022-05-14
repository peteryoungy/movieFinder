import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    films: null
}

const SearchResultSlice = createSlice({
    name: "search_result",
    initialState,
    reducers: {

        setSearchResult: (state, action) => {
            // att: though state is an object, we cannot directly change the value of the root state!

            // return action.payload
            
            // att: WRONG
            // const newState = action.payload;
            // state = newState

            return action.payload

        }
    }
})



export const {setSearchResult} = SearchResultSlice.actions;

export default SearchResultSlice.reducer;

