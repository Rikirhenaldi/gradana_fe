import axiosInstance from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast, Bounce } from 'react-toastify';
import Cookies from 'js-cookie';
import { create } from '@/features/actions/authAction';

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  '/auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const token = await create(email, password);
      // Set token in cookie with Secure flag (and optionally HttpOnly)
      Cookies.set('token', token, {
        secure: true,
        // httpOnly: true, // Consider adding HttpOnly if needed
        expires: 7, // Adjust expiration time as needed (in days)
      });

      toast.success('Login success', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return token; // Return the token
    } catch (error: any) {
      toast.error('Login Failed', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      if (error.response) {
        // Error response dari server
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // Error permintaan tidak mendapatkan respons
        return rejectWithValue('Network error: Server did not respond');
      } else {
        // Error lainnya
        return rejectWithValue(error.message);
      }
    }
  }
);

export const register = createAsyncThunk(
  '/auth/register',
  async ({ name, email, password, phone, navigation }: { name: string; email: string; password: string; phone: string, navigation : any }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/auth/register', { name, email, password, phone });

      toast.success('Registration success, Please Login !', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      
      return navigation.push("/auth/login") // Return the token
    } catch (error: any) {
      toast.error('Registration Failed', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      if (error.response) {
        // Error response dari server
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // Error permintaan tidak mendapatkan respons
        return rejectWithValue('Network error: Server did not respond');
      } else {
        // Error lainnya
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem('token');
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to register';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
