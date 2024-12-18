import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBoard, updateBoard, deleteBoard, getBoardById, getBoards } from '../api/boardApi'

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
export const updateBoardThunk = createAsyncThunk('boards/updateBoard', async (data, { rejectWithValue }) => {
   try {
      const { id, boardData } = data
      const response = await updateBoard(id, boardData)
      return response.data.board
   } catch (err) {
      return rejectWithValue(err.response?.data?.message || '게시물 삭제 실패')
   }
})

// 게시물 삭제 thunk
export const deleteBoardThunk = createAsyncThunk('boards/deleteBoard', async (id, { rejectWithValue }) => {
   try {
      // eslint-disable-next-line
      const response = await deleteBoard(id)
      return id // 삭제 후 삭제된 게시물의 id만 반환
   } catch (err) {
      return rejectWithValue(err.response?.data?.message || '게시물 삭제 실패')
   }
})

// 특정 게시물 조회 thunk
export const fetchBoardByIdThunk = createAsyncThunk('boards/fetchBoardById', async (id, { rejectWithValue }) => {
   try {
      const response = await getBoardById(id)
      return response.data
   } catch (err) {
      return rejectWithValue(err.response?.data?.message || '특정 게시물 조회 실패')
   }
})

// 전체 게시물 리스트 가져오기
export const fetchBoardsThunk = createAsyncThunk('boards/fetchBoards', async (page, { rejectWithValue }) => {
   try {
      const response = await getBoards(page)
      return response.data
   } catch (err) {
      return rejectWithValue(err.response?.data?.message || '전체 게시물 조회 실패')
   }
})

// 특정 인물 게시물 리스트 가져오기
// export const fetchBoardsByIdThunk = createAsyncThunk('boards/fetchBoardsById', async ({ userid, page }, { rejectWithValue }) => {
//    try {
//       const response = await getBoardsById(id, page)
//       return response.data
//    } catch (err) {
//       return rejectWithValue(err.response?.data?.message || '전체 게시물 조회 실패')
//    }
// })

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
      builder
         .addCase(updateBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateBoardThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(updateBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      builder
         .addCase(fetchBoardsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBoardsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.boards = action.payload.boards
            state.pagination = action.payload.pagination
         })
         .addCase(fetchBoardsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      builder
         .addCase(fetchBoardByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBoardByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.board = action.payload.board
         })
         .addCase(fetchBoardByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      builder
         .addCase(deleteBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteBoardThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(deleteBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default boardSlice.reducer
