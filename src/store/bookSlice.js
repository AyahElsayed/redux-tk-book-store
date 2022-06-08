import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const getBooks = createAsyncThunk('book/getBooks', async (_, thunkAPI) => {
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
  reducers: {},
})

export default bookSlice.reducer