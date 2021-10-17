import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchStory, createStory } from '../API/idomooAPI';

const initialState = {
    story: {},
    storyBoardFetchStatus: '',
    videoCreatorResponseStatus: '',
    videoCreatorResponseData: {},
    videoGeneratedStatusUrl: null,
    videoGeneratedUrl: null,
    videoGeneratedStatus: '',
};

export const fetchStoryBoardById = createAsyncThunk('idomoo/fetchStory', async () => {
    const response = await fetchStory();
    return response.data;
});

export const initGenerateVideo = createAsyncThunk('idomoo/createStory', async data => {
    const response = await createStory(data);
    return response;
});

export const videoSlice = createSlice({
    name: 'idomoo',
    initialState,
    reducers: {
        setField: (state, action) => {
            state.story[action.payload.key].val = action.payload.value;
        },
        setVideoGeneratedStatus: (state, action) => {
            state.videoGeneratedStatus = action.payload;
        },
    },
    extraReducers: {
        [fetchStoryBoardById.pending]: (state, action) => {
            state.storyBoardFetchStatus = 'Loading';
        },
        [fetchStoryBoardById.fulfilled]: (state, action) => {
            state.storyBoardFetchStatus = 'Completed';
            let dictionary = {};
            for (let i = 0; i < action.payload.length; i++) {
                dictionary[action.payload[i].key] = action.payload[i];
            }
            state.story = dictionary;
        },
        [fetchStoryBoardById.rejected]: (state, action) => {
            state.storyBoardFetchStatus = 'Error';
        },
        [initGenerateVideo.pending]: (state, action) => {
            state.videoCreatorResponseStatus = 'Loading';
        },
        [initGenerateVideo.fulfilled]: (state, action) => {
            state.videoCreatorResponseStatus = 'Completed';
            state.videoCreatorResponseData = action.payload;
            state.videoGeneratedStatusUrl = action.payload?.output?.video[0]?.links?.check_status_url;
            state.videoGeneratedUrl = action.payload?.output?.video[0]?.links?.url;
        },
        [initGenerateVideo.rejected]: (state, action) => {
            state.videoCreatorResponseStatus = 'Error';
        },
    },
});

export const { setField, setVideoGeneratedStatus } = videoSlice.actions;

export default videoSlice.reducer;
