// authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, Admin } from '../../types'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { axiosInstance } from '@/store/axios';

interface AuthState {
  user: User | null;
  admin: Admin | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  admin: null,
  loading: false,
  error: null,
};

// Define your async action using Redux Thunk for user login
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/login', credentials);
      return response.data as User;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msgStatus);
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
      return rejectWithValue(error.response?.data?.msgStatus);
    }
  }
);


export const adminLoginAsync = createAsyncThunk('auth/adminLogin', async (credentials: { email: string, password: string }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/admin/login', credentials);
    return response.data as Admin;
  } catch (error: any) {
    console.log("Error: ", error.response)
    return rejectWithValue(error.response?.data?.msgStatus);
  }
})

export const adminRegisterAsync = createAsyncThunk(
  'auth/adminRegister',
  async (credentials: { email: string; password: string, name: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/admin/signup', credentials);
      return response.data as Admin;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msgStatus);
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
export const { logout, adminLogout } = authSlice.actions;
export default persistReducer(rootPersistConfig, authSlice.reducer);