// authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};


// Define your async action using Redux Thunk for user login
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', credentials);
      return response.data as User;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msgStatus);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(loginAsync.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    }).addCase(loginAsync.rejected, (state, action: any) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    })
  },
});
const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['auth']
}
export default persistReducer(rootPersistConfig, authSlice.reducer);