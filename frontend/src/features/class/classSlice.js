import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';

import classService from './classService';

const initialState = {
    classes: [],
    isError: false,
    isLoading: false,
    message: ''
};

// Get All Classes
export const getClasses = createAsyncThunk(
    'class/getClasses',
    async (_, thunkAPI) => {
        try {
            return await classService.getAllClasses();
        } catch (error) {
            const message = error?.response?.data?.message ||
                error.message || error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
);

export const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        reset: (state) => {
            state.classes = [];
            state.isError = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClasses.pending, (state) => {
                state.classes = [];
                state.isError = false;
                state.isLoading = false;
                state.message = '';
            })
            .addCase(getClasses.fulfilled, (state, action) => {
                state.classes = action.payload;
                state.isError = false;
                state.isLoading = false;
                state.message = '';
            })
            .addCase(getClasses.rejected, (state, action) => {
                state.classes = [];
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
    }
});

const { reset } = classSlice.actions;
export default classSlice.reducer;