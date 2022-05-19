import { createSlice } from "@reduxjs/toolkit";


const initialState = ''

const SearchKeywordSlice = createSlice({
    name: "search_keyword",
    initialState,
    reducers: {

        setSearchKeyword: (state, action) => {

            return action.payload

        }
    }
})



export const {setSearchKeyword} = SearchKeywordSlice.actions;

export default SearchKeywordSlice.reducer;

