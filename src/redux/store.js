import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './VideoSlice'

export const store = configureStore({
  reducer: {
    video: videoReducer
  },
});


