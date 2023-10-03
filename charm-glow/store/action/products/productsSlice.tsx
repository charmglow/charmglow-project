import { PayloadAction, createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
interface Product {
    _id: string,
    title: string,
    price: number,
    category: string,
    productImage?: string,
    createdAt?: string,
    __v?: number
}
interface ProductState {
    products: Product[],
    loading: boolean;
    error: string | null;
}
const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};


export const getProductsAsync = createAsyncThunk(
    'products/fetch',
    async (userToken: string) => {
        try {
            const response = await axios.get('http://localhost:3001/api/products/all', { headers: { "Authorization": `Bearer ${userToken}` } });
            return response.data?.products;
        } catch (error: any) {
            return isRejectedWithValue(error.response?.data?.error);
        }
    }
);

export const addProductAsync = createAsyncThunk("products/add", async (data: any) => {
    try {
        const formData = new FormData();
        formData.append('productImage', data.productImage?.file);
        formData.append('title', data.title);
        formData.append("description", data.description);
        formData.append('price', data.price);
        formData.append('category', data.category);
        const response = await axios.post('http://localhost:3001/api/products/add', formData, { headers: { "Authorization": `Bearer ${data?.userToken}`, 'Content-Type': 'multipart/form-data' } });
        return response.data;
    } catch (error: any) {
        return isRejectedWithValue(error.response?.data?.error);
    }
})

export const updateProductAsync = createAsyncThunk("products/update", async (data: any) => {
    try {
        console.log('====================================');
        console.log("data:", data);
        console.log('====================================');
        const response = await axios.put(`http://localhost:3001/api/products/${data.id}`, data, { headers: { "Authorization": `Bearer ${data?.userToken}` } });
        return response.data;
    } catch (error: any) {
        return isRejectedWithValue(error.response?.data?.error);
    }
})

export const deleteProductAsync = createAsyncThunk(
    'products/delete',
    async (data: {
        userToken: string,
        id: string
    }) => {
        try {
            const headers = {
                Authorization: `Bearer ${data?.userToken}`,
            };
            const response = await axios.delete(`http://localhost:3001/api/products/${data.id}`, { headers });
            return response.data?.data as Product;
        } catch (error: any) {
            return isRejectedWithValue(error.response?.data?.error);
        }
    }
);
interface GetProductsFulfilledAction {
    payload: Product[];
}
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getProductsAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getProductsAsync.fulfilled, (state, action: any) => {
            state.loading = false;
            state.products = action.payload;
            state.error = null;
        }).addCase(getProductsAsync.rejected, (state, action: any) => {
            state.loading = false;
            state.products = [];
            state.error = action.payload;
        })
        builder.addCase(deleteProductAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(deleteProductAsync.fulfilled, (state, action: any) => {
            state.loading = false;
            state.error = null;
            state.products = state.products.filter(item => item._id != action.payload._id)
        }).addCase(deleteProductAsync.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(addProductAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(addProductAsync.fulfilled, (state, action: any) => {
            state.loading = false;
            state.error = null;
            state.products = [...state.products, action.payload?.data];
        }).addCase(addProductAsync.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(updateProductAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(updateProductAsync.fulfilled, (state, action: any) => {
            state.loading = false;
            state.error = null;
            state.products = state.products.map(item => item._id === action.payload?.data._id ? action.payload?.data : item);
        }).addCase(updateProductAsync.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })
    },

});

export default productsSlice.reducer;