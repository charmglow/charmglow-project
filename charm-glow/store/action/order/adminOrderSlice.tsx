import { axiosAdminInstance } from "@/store/axios";
import { Order } from "@/store/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAdminOrdersAsync = createAsyncThunk('adminorders/getordersbyadmin', async (credientials: {
    page?: number, limit?: number, delivery_status?: string
}, { rejectWithValue }) => {
    try {
        const response = await axiosAdminInstance.get(`/getordersbyadmin?page=${credientials.page}&limit=${credientials.limit}&delivery_status=${credientials.delivery_status}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error);
    }
})
export const updateDeliveryStatusAsync = createAsyncThunk('adminorders/updatedeliveryStatus', async (credientials: {
    orderId: any,
    newStatus: string
}, { rejectWithValue }) => {
    try {
        const response = await axiosAdminInstance.post(`/update-status`, credientials);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error);
    }
})

export const getDeliveryStatusCountAsync = createAsyncThunk('adminorders/getdeliveryStatusCount', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosAdminInstance.get(`/status-count`);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error);
    }
})



interface OrderState {
    orders: Order[];
    total: number | 0;
    error: string | null;
    loading: boolean;
    statusAnalytics: {
        totalPending: number | 0,
        totalProcessing: number | 0,
        totalShipped: number | 0,
        totalDelivered: number | 0,
    }
}

const initialState: OrderState = {
    orders: [],
    statusAnalytics: {
        totalPending: 0,
        totalProcessing: 0,
        totalShipped: 0,
        totalDelivered: 0,
    },
    total: 0,
    error: null,
    loading: false

}
const orderAdminSlice = createSlice({
    name: 'adminorders',
    initialState,
    reducers: {
        updateDeliveryStatusAction: (state, action) => {
            const { orderId, newStatus } = action.payload;

            // Find the index of the order in the state.orders array
            const orderIndex = state.orders.findIndex((order) => order._id === orderId);

            // If found, update the delivery_status of the order
            if (orderIndex !== -1) {
                state.orders[orderIndex].delivery_status = newStatus;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAdminOrdersAsync.pending, (state) => {
            state.error = null;
            state.loading = true;
        })
        builder.addCase(fetchAdminOrdersAsync.fulfilled, (state, action: any) => {
            state.loading = false;
            state.error = null;
            state.orders = action.payload?.orders;
            state.total = action.payload?.total;
        }).addCase(fetchAdminOrdersAsync.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.error;
        })
        builder.addCase(getDeliveryStatusCountAsync.pending, (state) => {
            state.error = null;
            state.loading = true;
        })
        builder.addCase(getDeliveryStatusCountAsync.fulfilled, (state, action: any) => {
            state.loading = false;
            state.error = null;
            state.statusAnalytics = action.payload;
        }).addCase(getDeliveryStatusCountAsync.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.error;
        })
    }
});

export const { updateDeliveryStatusAction } = orderAdminSlice.actions;
export default orderAdminSlice.reducer;