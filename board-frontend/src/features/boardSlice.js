import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBoard, updateBoard, deleteBoard, getBoardById } from '../api/boardApi'

// 게시물 등록 thunk
export const createBoardThunk = createAsyncThunk('boards/createBoard', async (BoardData, { rejectWithValue }) => {
   try {
      const response = await createBoard(BoardData)
      return response.data.board
   } catch (err) {
      return rejectWithValue(err.response?.data?.message || '게시물 등록 실패')
   }
})

// 게시물 수정 thunk
export const updateBoardThunk = createAsyncThunk('boards/updateBoard', async (data, { rejectWithValue }) => {})

// 게시물 삭제 thunk
export const deleteBoardThunk = createAsyncThunk('boards/deleteBoard', async (id, { rejectWithValue }) => {})

// 특정 게시물 조회 thunk
export const fetchBoardByIdBoardThunk = createAsyncThunk('boards/fetchBoardByIdBoard', async (id, { rejectWithValue }) => {})

const boardSlice = createSlice({
   name: 'boards',
   initialState: {
      boards: [],
      board: null,
      pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.boards = [...state.boards, action.payload]
         })
         .addCase(createBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default boardSlice.reducer
