import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface AuthState {
    success: boolean;
    user: null | { email: string };
    loading: boolean;
    error: any;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    success: false,
};

interface SignInArgs {
    email: string;
    password: string;
}

export interface SignUpArgs {
    name: string;
    email: string;
    password: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const isAxiosError = (error: any): error is AxiosError => {
    return (error as AxiosError).isAxiosError !== undefined;
};

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (signUpData: SignUpArgs, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, signUpData);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: SignInArgs, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/signin`, { email, password });
            return response.data; // Assuming response.data contains the user data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

interface ChangePasswordArgs {
    currentPassword: string;
    newPassword: string;
}

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async ({ currentPassword, newPassword }: ChangePasswordArgs, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${API_BASE_URL}/auth/changepassword`, { currentPassword, newPassword });
            return response.data;
        } catch (error: any) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // signIn
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            })
            // signUp
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            })
            // changePassword
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
