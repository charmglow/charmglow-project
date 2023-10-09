import { User } from "@/store/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
        const userToken: any = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:3001/api/customers', { headers: { "Authorization": `Bearer ${userToken}` } });
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
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
            state.customers = action.payload?.Users;
            state.error = null;
        }).addCase(fetchCustomersAsync.rejected, (state, action: any) => {
            state.loading = false;
            state.customers = [];
            state.error = action.payload;
        })

    },
})

export default customersSlice.reducer;