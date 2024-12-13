import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser } from '../api/boardApi'

export const registerUserThunk = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await registerUser(userData)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '회원가입 실패')
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(registerUserThunk.pending, (state) => {
         state.loading = true
         state.error = null
      })
      builder.addCase(registerUserThunk.fulfilled, (state, action) => {
         state.loading = false
         state.user = action.payload
      })
      builder.addCase(registerUserThunk.rejected, (state, action) => {
         state.loading = true
         state.error = action.payload
      })
   },
})

export default authSlice.reducer
