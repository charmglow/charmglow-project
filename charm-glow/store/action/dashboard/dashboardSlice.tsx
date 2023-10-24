import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Analytics } from '../../types';
import axios from "axios";
import { error } from "console";
interface AnalyticsState {
    analytics: Analytics | {
        customerCount: 0,
        productCount: 0,
    };
    error: string | null;
    loading: boolean;
}

const initialState: AnalyticsState = {
    analytics: {
        customerCount: 0,
        productCount: 0,
    },
    error: null,
    loading: false

}

export const fetchAnalyticsAsync = createAsyncThunk('analytics/fetch', async (_, { rejectWithValue }) => {
    try {
        const userToken: any = localStorage.getItem('userToken');
        const response = await axios.get(`${process.env.BASE_URL_API}`, { headers: { "Authorization": `Bearer ${userToken}` } });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.msgStatus);
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
            state.error = action.payload?.msgStatus;
        })
    },
});


export default dashboardSlice.reducer;