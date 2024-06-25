import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authService from './authService';

// Get the user from local storage
const loginUser = JSON.parse(localStorage.getItem('course-mgmt-user'))

const initialState = {
    user: loginUser ? loginUser : null,
    isError: false,
    isLoading: false,
    message: ''
};

// Register User
export const register = createAsyncThunk(
    'auth/register',
    async(user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message = error?.response?.data?.error ||
                error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Login User
export const login = createAsyncThunk(
    'auth/login',
    async(user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            const message = error?.response?.data?.error ||
                error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
                state.user = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.user = action.payload.results;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;