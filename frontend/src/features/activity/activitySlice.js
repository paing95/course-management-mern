import {
    createAsyncThunk, createSlice
} from '@reduxjs/toolkit';

import activityService from './activityService';

const initialState = {
    activities: [],
    isError: false,
    isLoading: false,
    message: ''
};

// Get All Activities
export const getActivities = createAsyncThunk(
    'activity/getActivities',
    async (_, thunkAPI) => {
        try {
            return await activityService.getAllActivities();
        } catch (error) {
            const message = error?.response?.data?.message || 
                error.message || error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
);

export const createActivity = createAsyncThunk(
    'activity/createActivity',
    async(data, thunkAPI) => {
        try {
            return await activityService.createActivity(data);
        } catch (error) {
            const message = error?.response?.data?.message ||
                error.message || error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
)

export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        reset: (state) => {
            state.activities = [];
            state.isError = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getActivities.pending, (state) => {
                state.activities = [];
                state.isError = false;
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getActivities.fulfilled, (state, action) => {
                state.activities = action.payload;
                state.isError = false;
                state.isLoading = false;
                state.message = '';
            })
            .addCase(getActivities.rejected, (state, action) => {
                state.activities = [];
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(createActivity.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createActivity.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.message = '';
            })
            .addCase(createActivity.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
    }
});

export const { reset } = activitySlice.actions;
export default activitySlice.reducer;