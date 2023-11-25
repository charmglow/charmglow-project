import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Analytics } from '../../types';
import axios from "axios";
import { axiosAdminInstance } from "@/store/axios";
interface AnalyticsState {
    analytics: Analytics | {
        customerCount: 0,
        productCount: 0,
        orderCount: 0,
    };
    error: string | null;
    loading: boolean;
}

const initialState: AnalyticsState = {
    analytics: {
        customerCount: 0,
        productCount: 0,
        orderCount: 0,
    },
    error: null,
    loading: false

}

export const fetchAnalyticsAsync = createAsyncThunk('analytics/fetch', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosAdminInstance.get(`/analytics`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error);
    }
})

const dashboardSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAnalyticsAsync.pending, (state) => {
            state.error = null;
            state.loading = true;
        })
        builder.addCase(fetchAnalyticsAsync.fulfilled, (state, action: any) => {
            state.loading = false;
            state.error = null;
            state.analytics = action.payload?.analytics;
        }).addCase(fetchAnalyticsAsync.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.error;
        })
    },
});


export default dashboardSlice.reducer;