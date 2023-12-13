// authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, Admin, Cart, OrderAnalytics } from '../../types'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { axiosInstance, axiosUserInstance } from '@/store/axios';

interface AuthState {
  user: User | null;
  OrderAnalytics: OrderAnalytics[] | [];
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
  cart: [],
  OrderAnalytics: [
    {
      month: "January",
      totalOrders: 0,
      totalSpend: 0
    },
    {
      month: "February",
      totalOrders: 0,
      totalSpend: 0
    },
    {
      month: "March",
      totalOrders: 0,
      totalSpend: 0
    },
    {
      month: "April",
      totalOrders: 0,
      totalSpend: 0
    },
    {
      month: "May",
      totalOrders: 0,
      totalSpend: 0
    },
    {
      month: "June",
      totalOrders: 0,
      totalSpend: 0
    },
    {
      month: "July",
      totalOrders: 0,
      totalSpend: 0
    },
    {
      month: "August",
      totalOrders: 0,
      totalSpend: 0
    },
    {
      month: "September",
      totalOrders: 0,
      totalSpend: 0
    },
    {
      month: "October",
      totalOrders: 0,
      totalSpend: 0
    },
    {
      month: "November",
      totalOrders: 0,
      totalSpend: 0
    },
    {
      month: "December",
      totalOrders: 0,
      totalSpend: 0
    }
  ]
};

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

export const updateShippingAddressAsync = createAsyncThunk(
  'auth/update',
  async (credentials: {
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      country: string;
    }
  }, { rejectWithValue }) => {
    try {
      const response = await axiosUserInstance.post('/user/updateaddress', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);


export const getOrderAnalyticsAsync = createAsyncThunk(
  'auth/analyticsorder',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosUserInstance.get('/user/chartdata');
      return response.data;
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
      localStorage.removeItem('userToken');
      storage.removeItem('persist:root');
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    adminLogout: (state) => {
      localStorage.removeItem('adminToken');
      storage.removeItem('persist:root');
      state.admin = null;
      state.loading = false;
      state.error = null;
    },
    emptyCart: (state) => {
      state.cart = [];
    },
    addToCart: (state, action) => {
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
          title: action.payload.title
          // Add other properties from your payload
        };

        return {
          ...state,
          cart: state.cart ? [...state.cart, newProduct] : [newProduct],
        };
      }
    },
    changeCartItemQuantity: (state, action) => {
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
    builder.addCase(updateShippingAddressAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(updateShippingAddressAsync.fulfilled, (state, action: any) => {
      state.loading = false;
      if (state.user) {
        state.user.shippingAddress = action.payload.user.shippingAddress;
      }
      state.error = null;
    }).addCase(updateShippingAddressAsync.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    })

    builder.addCase(getOrderAnalyticsAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(getOrderAnalyticsAsync.fulfilled, (state, action: any) => {
      state.loading = false;
      state.OrderAnalytics = action.payload.chartData;
      state.error = null;
    }).addCase(getOrderAnalyticsAsync.rejected, (state, action: any) => {
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
export const { logout, adminLogout, addToCart, changeCartItemQuantity, removeItemFromCart, emptyCart } = authSlice.actions;
export default persistReducer(rootPersistConfig, authSlice.reducer);