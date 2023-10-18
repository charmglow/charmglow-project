import { axiosAdminInstance } from "@/store/axios";
import { User } from "@/store/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CustomersState {
    customers: User[] | [];
    loading: boolean;
    error: string | null;
}
const initialState: CustomersState = {
    customers: [],
    loading: false,
    error: null,
}

export const fetchCustomersAsync = createAsyncThunk('customers/fetch', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosAdminInstance.get('/admin/customers');
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.msgStatus);
    }
})
const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCustomersAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchCustomersAsync.fulfilled, (state, action: any) => {
            state.loading = false;
            state.customers = action.payload?.users;
            state.error = null;
        }).addCase(fetchCustomersAsync.rejected, (state, action: any) => {
            state.loading = false;
            state.customers = [];
            state.error = action.payload;
        })

    },
})

export default customersSlice.reducer;