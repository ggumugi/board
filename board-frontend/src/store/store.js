import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import boardReducer from '../features/boardSlice'
import pageReducer from '../features/pageSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      boards: boardReducer,
      page: pageReducer,
   },
})

export default store
