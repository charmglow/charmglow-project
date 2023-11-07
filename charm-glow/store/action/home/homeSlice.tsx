import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axios";
import { Product } from "@/store/types";
interface HomeState {
    latestProducts: Product[];
    filterProducts: {
        currentPage?: number;
        totalPages?: number;
        totalProducts?: number;
        products: Product[];
    }
    error: string | null;
    loading: boolean;
}

const initialState: HomeState = {
    latestProducts: [],
    filterProducts: {
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
        products: []
    },
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
export const fetchFiterProductsAsync = createAsyncThunk('home/fetchfilterproducts', async (data: {
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    page?: number
}, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/products/filter`, {
            params: {
                category: data?.category,
                minPrice: data?.minPrice,
                maxPrice: data?.maxPrice,
                page: data?.page
            }
        });
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

        builder.addCase(fetchFiterProductsAsync.pending, (state) => {
            state.error = null;
            state.loading = true;
        })
        builder.addCase(fetchFiterProductsAsync.fulfilled, (state, action: any) => {
            state.loading = false;
            state.error = null;
            state.filterProducts = action.payload;
        }).addCase(fetchFiterProductsAsync.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.error;
            state.filterProducts = initialState.filterProducts
        })
    },
});


export default homeSlice.reducer;