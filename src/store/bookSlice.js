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

export const insrtBook = createAsyncThunk('book/insrtBook', async (bookData, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI
  // getState can access to state
  try {
    bookData.userName = getState().auth.name
    const res = await fetch('http://localhost:3005/books', {
      method: 'POST',
      body: JSON.stringify(bookData),
      headers: {
        'content-type': 'application/json; charset=UTF-8'
      }
    })
    const data = await res.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteBook = createAsyncThunk('book/deleteBook', async (item, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await fetch(`http://localhost:3005/books/${item.id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json; charset=UTF-8'
      },
      
    })
    console.log('res',res)
    return item
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
const bookSlice = createSlice({
  name: 'Book',
  initialState: { books: [], isLoading: false, error: '' },
  extraReducers: {
    // get books
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
    ,
    // insert a new book
    [insrtBook.pending]: (state, action) => {
      state.isLoading = true
    },
    [insrtBook.fulfilled]: (state, action) => {
      state.isLoading = false
      state.books.push(action.payload)
    },
    [insrtBook.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // delete Book
    [deleteBook.pending]: (state, action) => {
      state.isLoading = true
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false
      state.books = state.books.filter((el) => el.id !== action.payload.id)
      console.log(action)

    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default bookSlice.reducer