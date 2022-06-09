import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getBooks = createAsyncThunk('book/getBooks', async (_, thunkAPI) => { // '_' mean that there is an arg but not used
  try {
    const res = await fetch('http://localhost:3005/books')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
  }
})

const bookSlice = createSlice({
  name: 'Book',
  initialState: { books: null },
  extraReducers: {
    [getBooks.pending]: (state, action) => {
      console.log(action)
    },
    [getBooks.fulfilled]: (state, action) => {
      console.log(action)
    },
    [getBooks.rejected]: (state, action) => {
      console.log(action)
    }
  },
})

export default bookSlice.reducer