import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axios";
import { Product } from "@/store/types";
interface HomeState {
    latestProducts: Product[];
    error: string | null;
    loading: boolean;
}

const initialState: HomeState = {
    latestProducts: [],
    error: null,
    loading: false

}

export const fetchLatestProductsAsync = createAsyncThunk('home/fetchlatestproducts', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/products/latest`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error);
    }
})

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLatestProductsAsync.pending, (state) => {
            state.error = null;
            state.loading = true;
        })
        builder.addCase(fetchLatestProductsAsync.fulfilled, (state, action: any) => {
            state.loading = false;
            state.error = null;
            state.latestProducts = action.payload?.latestProducts;
        }).addCase(fetchLatestProductsAsync.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.error;
        })
    },
});


export default homeSlice.reducer;