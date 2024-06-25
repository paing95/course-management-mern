import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import CourseFileService from "./courseFileService";

const initialState = {
    isLoading: false,
    isError: false,
    message: ''
};

// Upload course file
export const uploadCourseFile = createAsyncThunk(
    'courseFile/uploadCourseFile',
    async (data, thunkAPI) => {
        try {
            return await CourseFileService.UploadCourseFile(data);
        } catch (error) {
            const message = error?.response?.data?.message ||
                error.message || error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
);

export const courseFileSlice = createSlice({
    name: 'courseFile',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadCourseFile.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
            })
            .addCase(uploadCourseFile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(uploadCourseFile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = action.payload;
            })
    }
});

const { reset } = courseFileSlice.actions;
export default courseFileSlice.reducer;