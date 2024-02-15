import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    saved: []
}

const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers: {
      addWord: (state, action) => {
        // Check if the word is not already in the bookmark
        if (!state.includes(action.payload)) {
          state.push(action.payload);
        }
      },
      removeWord: (state, action) => {
        // Remove the word from the bookmark if it exists
        return state.filter((word) => word !== action.payload);
      },
      resetBookmark: () => [],
    },
  });
  
  export const { addWord, removeWord, resetBookmark } = bookmarkSlice.actions;
  export default bookmarkSlice.reducer;