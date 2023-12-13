import { axiosUserInstance } from "@/store/axios";
import { Order } from "@/store/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserOrdersAsync = createAsyncThunk('order/fetchUserOrdersAsync', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosUserInstance.get(`/user-orders`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error);
    }
})
interface OrderState {
    orders: Order[];
    error: string | null;
    loading: boolean;
}

const initialState: OrderState = {
    orders: [],
    error: null,
    loading: false

}
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserOrdersAsync.pending, (state) => {
            state.error = null;
            state.loading = true;
        })
        builder.addCase(fetchUserOrdersAsync.fulfilled, (state, action: any) => {
            state.loading = false;
            state.error = null;
            state.orders = action.payload?.orders;
        }).addCase(fetchUserOrdersAsync.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.error;
        })
    },
});


export default orderSlice.reducer;