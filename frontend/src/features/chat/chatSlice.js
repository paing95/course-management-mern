import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';

import chatService from './chatService';

const initialState = {
    chats: [],
    isError: false,
    isLoading: false,
    message: '',
    isAddChatError: false,
    isAddChatLoading: false,
    addChatMessage: ''
};

// Get Chats by Room ID
export const getChatsByRoomId = createAsyncThunk(
    'chat/getChatsByRoomId',
    async (id, thunkAPI) => {
        try {
            return await chatService.getChatsByRoomId(id);
        } catch (error) {
            const message = error?.response?.data?.message ||
                error.message || error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
);

// Add Chat
export const addChat = createAsyncThunk(
    'chat/addChat',
    async (data, thunkAPI) => {
        try {
            return await chatService.addChat(data);
        } catch (error) {
            const message = error?.response?.data?.message ||
                error.message || error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
)

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        reset: (state) => {
            state.chats = [];
            state.isError = false;
            state.isLoading = false;
            state.message = '';
            state.isAddChatError = false;
            state.isAddChatLoading = false;
            state.addChatMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChatsByRoomId.pending, (state) => {
                state.chats = [];
                state.isError = false;
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getChatsByRoomId.fulfilled, (state, action) => {
                state.chats = action.payload;
                state.isError = false;
                state.isLoading = false;
                state.message = '';
            })
            .addCase(getChatsByRoomId.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(addChat.pending, (state) => {
                state.isAddChatError = false;
                state.isAddChatLoading = true;
                state.addChatMessage = '';
            })
            .addCase(addChat.fulfilled, (state, action) => {
                state.isAddChatError = false;
                state.isAddChatLoading = false;
                state.addChatMessage = '';
            })
            .addCase(addChat.rejected, (state, action) => {
                state.isAddChatError = true;
                state.isAddChatLoading = false;
                state.addChatMessage = action.payload;
            })
    }
});

export const { reset } = chatSlice.actions;
export default chatSlice.reducer;