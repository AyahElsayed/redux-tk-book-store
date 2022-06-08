import { createSlice } from '@reduxjs/toolkit'

const bookSlice = createSlice({
  name: 'Book',
  initialState: { books: null },
  reducers:{},
})

export default bookSlice.reducer