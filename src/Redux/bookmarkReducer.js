import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    saved: []
}

const bookmarkReducer = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addWord: (state, action) => {
      // Check if the word is not already in the bookmark
      if (!state.saved.includes(action.payload)) {
        state.saved.push(action.payload);
      }
    },
    removeWord: (state, action) => {
      // Remove the word from the bookmark if it exists
      state.saved = state.saved.filter((word) => word !== action.payload);
    },
    resetBookmark: (state) => {
      state.saved = [];
    },
  },
});

export const { addWord, removeWord, resetBookmark } = bookmarkReducer.actions;
export default bookmarkReducer.reducer;