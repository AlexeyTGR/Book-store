import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Books } from '../types';

export interface BookState {
  books: Books | [],
}

export const initialState: BookState = {
  books: [],
};

export const bookReducer = createSlice({
  initialState,
  name: 'books',
  reducers: {
    setBooks: (state, action: PayloadAction<Books>) => {
      state.books = action.payload;
    },
  },
});

export const { setBooks } = bookReducer.actions;

export default bookReducer.reducer;
