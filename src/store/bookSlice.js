import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getBooks = createAsyncThunk('book/getBooks', async (_, thunkAPI) => { // '_' mean that there is an arg but not used
  const { rejectWithValue } = thunkAPI
  try {
    const res = await fetch('http://localhost:3005/books')
    const data = await res.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const bookSlice = createSlice({
  name: 'Book',
  initialState: { books: [], isLoading: false, error: '' },
  extraReducers: {
    [getBooks.pending]: (state, action) => {
      state.isLoading = true
      console.log(action)
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false
      state.books = action.payload
      console.log(action)
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
      console.log(action)
    }
  },
})

export default bookSlice.reducer