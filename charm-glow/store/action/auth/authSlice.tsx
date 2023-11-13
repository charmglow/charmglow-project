// authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, Admin, Cart } from '../../types'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { axiosAdminInstance, axiosInstance } from '@/store/axios';

interface AuthState {
  user: User | null;
  admin: Admin | null;
  cart: Cart[] | [];
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  admin: null,
  loading: false,
  error: null,
  cart: []
};

// Define your async action using Redux Thunk for user login
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/login', credentials);
      return response.data as User;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string, name: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/signup', credentials);
      return response.data as User;
    } catch (error: any) {
      console.log("Error: ", error.response)
      return rejectWithValue(error.response?.data?.error);
    }
  }
);


export const adminLoginAsync = createAsyncThunk('auth/adminLogin', async (credentials: { email: string, password: string }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/admin/login', credentials);
    return response.data as Admin;
  } catch (error: any) {
    console.log("Error: ", error.response)
    return rejectWithValue(error.response?.data?.error);
  }
})

export const adminRegisterAsync = createAsyncThunk(
  'auth/adminRegister',
  async (credentials: { email: string; password: string, name: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/signup', credentials);
      return response.data as Admin;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      // Reset the authentication state to its initial values
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    adminLogout: (state) => {
      state.admin = null;
      state.loading = false;
      state.error = null;
    },
    addToCart: (state, action) => {
      console.log('====================================');
      console.log(action.payload);
      console.log('====================================');
      const existingProductIndex = state.cart
        ? state.cart.findIndex((cart) => cart._id === action.payload._id)
        : -1;
      const quantity = 1; // Set your logic for quantity
      const total = action.payload.price * quantity; // Calculate total based on price and quantity
      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, update the quantity and total
        const updatedProducts = [...state.cart];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity: updatedProducts[existingProductIndex].quantity + quantity,
          total: updatedProducts[existingProductIndex].total + total,
        };
        return {
          ...state,
          cart: updatedProducts,
        };
      } else {
        // If the product is not in the cart, add it
        const newProduct = {
          _id: action.payload._id,
          quantity,
          total,
          price: action.payload.price,
          productImage: action.payload.productImage,
          // Add other properties from your payload
        };

        return {
          ...state,
          cart: state.cart ? [...state.cart, newProduct] : [newProduct],
        };
      }
    },
    changeCartItemQuantity: (state, action) => {
      console.log('====================================');
      console.log(action.payload);
      console.log('====================================');
      const updatedCart = state.cart.map(item => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            quantity: action.payload.quantity,
            total: action.payload.quantity * item.price, // Assuming price is constant for simplicity
          };
        }
        return item;
      });

      return {
        ...state,
        cart: updatedCart,
      };
    },
    removeItemFromCart: (state, action) => {
      const updatedCart = state.cart.filter(item => item._id !== action.payload._id);

      return {
        ...state,
        cart: updatedCart,
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(loginAsync.fulfilled, (state, action: PayloadAction<User>) => {
      localStorage.setItem("userToken", action.payload.token)
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    }).addCase(loginAsync.rejected, (state, action: any) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    })
    builder.addCase(registerAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(registerAsync.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    }).addCase(registerAsync.rejected, (state, action: any) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    })
    builder.addCase(adminLoginAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(adminLoginAsync.fulfilled, (state, action: PayloadAction<Admin>) => {
      localStorage.setItem("adminToken", action.payload.token)
      state.loading = false;
      state.admin = action.payload;
      state.error = null;
    }).addCase(adminLoginAsync.rejected, (state, action: any) => {
      state.loading = false;
      state.admin = null;
      state.error = action.payload;
    })
    builder.addCase(adminRegisterAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(adminRegisterAsync.fulfilled, (state, action: PayloadAction<Admin>) => {
      state.loading = false;
      state.admin = null;
      state.error = null;
    }).addCase(adminRegisterAsync.rejected, (state, action: any) => {
      state.loading = false;
      state.admin = null;
      state.error = action.payload;
    })
  },
});
const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['navigation', 'auth'],
}
export const { logout, adminLogout, addToCart, changeCartItemQuantity, removeItemFromCart } = authSlice.actions;
export default persistReducer(rootPersistConfig, authSlice.reducer);