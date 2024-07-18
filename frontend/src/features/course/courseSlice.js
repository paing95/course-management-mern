import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';

import courseService from "./courseService";

const initialState = {
    courses: [],
    course_detail: null,
    isError: false,
    isLoading: false,
    message: ''
};

// Get All Courses
export const getCourses = createAsyncThunk(
    'course/getCourses',
    async (_, thunkAPI) => {
        try {
            return await courseService.getAllCourses();
        } catch (error) {
            const message = error?.response?.data?.message ||
                error.message || error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
);

// Get A Course
export const getCourseDetail = createAsyncThunk(
    'course/getCourseDetail',
    async(data, thunkAPI) => {
        try {
            return await courseService.getCourseDetail(data.id);
        } catch (error) {
            const message = error?.response?.data?.message ||
                error.message || error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
)

// Create Course
export const createCourse = createAsyncThunk(
    'course/createCourse',
    async (data, thunkAPI) => {
        try {
            return await courseService.createCourse(data);
        } catch (error) {
            const message = error?.response?.data?.message ||
                error.message || error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
)

// Update Course
export const updateCourse = createAsyncThunk(
    'course/updateCourse',
    async (data, thunkAPI) => {
        try {
            return await courseService.updateCourse(data.id, data.data);
        } catch (error) {
            const message = error?.response?.data?.message ||
                error.message || error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
);

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        reset: (state) => {
            state.courses = [];
            state.course_detail = null;
            state.isError = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCourses.pending, (state) => {
                state.courses = [];
                state.isError = false;
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.courses = action.payload;
                state.isError = false;
                state.isLoading = false;
                state.message = '';
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.courses = [];
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(getCourseDetail.pending, (state) => {
                state.course_detail = null;
                state.isError = false;
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getCourseDetail.fulfilled, (state, action) => {
                state.course_detail = action.payload;
                state.isError = false;
                state.isLoading = false;
                state.message = '';
            })
            .addCase(getCourseDetail.rejected, (state, action) => {
                state.course_detail = null;
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(createCourse.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.message = '';
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = '';
            })
            .addCase(updateCourse.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
                state.message = '';
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.message = '';
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = '';
            })
    }
});

const { reset } = courseSlice.actions;
export default courseSlice.reducer;