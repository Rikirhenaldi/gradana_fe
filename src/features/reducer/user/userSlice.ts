import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserDataAPI } from '../../actions/userAction';

interface User {
    user: any;
    id: string;
    name: string;
    phone: string;
    email: string;
}

interface TopUpHistory {
    id: string;
    userId: string;
    amount: number;
    date: string;
}

interface Balance {
    id: string;
    user: string
    amount: number,
}

// Async Thunks
export const fetchUserData = createAsyncThunk(
    'users/fetchUserData',
    async (userId: string) => {
        const response = await fetchUserDataAPI();
        return response;
    }
);


// Users Slice
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        userData: null as User | null,
        topUpHistory: [] as TopUpHistory[],
        balance: null as Balance | null,
        status: 'idle',
        error: null as string | null, // Initialize error as null or string
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Reset error state on pending
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload.user;
                state.topUpHistory = action.payload.topUpHistory;
                state.balance = action.payload.balance;
                state.error = null; // Reset error state on success
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch user data';
            })
    },
});

export default usersSlice.reducer;
