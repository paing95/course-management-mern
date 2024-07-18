import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';

import courseCatalogService from './courseCatalogService';

const initialState = {
    catalogs: [],
    isError: false,
    isLoading: false,
    message: ''
};

// Get All Course Catalogs
export const getCourseCatalogs = createAsyncThunk(
    'courseCatalog/getCourseCatalogs',
    async(_, thunkAPI) => {
        try {
            return courseCatalogService.getAllCourseCatalogs();
        } catch (error) {
            const message = error?.response?.data?.message ||
                error.message || error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
);

export const courseCatalogSlice = createSlice({
    name: 'courseCatalog',
    initialState,
    reducers: {
        reset: (state) => {
            state.catalogs = [];
            state.isError = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCourseCatalogs.pending, (state) => {
                state.catalogs = [];
                state.isError = false;
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getCourseCatalogs.fulfilled, (state, action) => {
                state.catalogs = action.payload;
                state.isError = false;
                state.isLoading = false;
                state.message = '';
            })
            .addCase(getCourseCatalogs.rejected, (state, action) => {
                state.catalogs = [];
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
    }
});

const { reset } = courseCatalogSlice.actions;
export default courseCatalogSlice.reducer;