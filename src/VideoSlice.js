import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchStory } from './API/idomooAPI'
    
const initialState = {
  story: {},
  status: "",
};

export const fetchStoryBoardById = createAsyncThunk('idomoo/fetchStory', async () => {
    const response = await fetchStory();
    return response.data;
  }
);

export const videoSlice = createSlice({
  name: 'idomoo',
  initialState,
  reducers: {
    setField: (state, action) => {
      state.story[action.payload.key].val = action.payload.value;
    },
  },
  extraReducers: {
      [fetchStoryBoardById.pending]: (state, action) => {
        state.status = "Loading";
      },
      [fetchStoryBoardById.fulfilled]: (state, action) => {
        state.status = "Completed";
        let dictionary = {};
        for(let i = 0; i < action.payload.length; i++) {
            dictionary[action.payload[i].key] = action.payload[i];
        }
        state.story = dictionary;
      },
      [fetchStoryBoardById.rejected]: (state, action) => {
        state.status = "Error";
      }
  },
});

export const { setField } = videoSlice.actions;

export const selectedStory = (state) => state.counter.value;

export default videoSlice.reducer;
