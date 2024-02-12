import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { URL } from '../Constant';
import { Show_Toast } from '../pages/Components/Toastify';

// Define the type for user data
interface UserData {
    email: string;
    password: string;
}

// Define the type for the user information in the state
interface AuthState {
    userInfo: UserData | null;
    pending: boolean;
    error: boolean;
}

// Redux action to get user
export const fetchUser = createAsyncThunk<UserData, UserData>('fetchUser', async (data) => {
    const { email, password } = data;

    const config = {
        headers: { 'content-type': 'application/json' },
    };

    const response = await axios.post(
        `${URL}/api/user/user-login`,
        {
            email,
            password,
        },
        config
    );

    console.log(response,"response=");

    return response.data; // Corrected to return only the data
});


export const logout = createAsyncThunk('logout', async () => {
    localStorage.removeItem('userInfo');
});

// redux
const initialState: AuthState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
    pending: false,
    error: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.pending = true;
            state.userInfo = null;
            state.error = false;
        });
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserData>) => {
            state.pending = false;
            state.userInfo = action.payload;
            state.error = false;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            Show_Toast({ message: 'User logged in successfully!', type: true });        

        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.pending = false;
            state.error = true;
        Show_Toast({ message: 'Invalid Login Credentials', type: false });        

        });
        builder.addCase(logout.fulfilled, (state) => {
            state.userInfo = null;
            Show_Toast({ message: 'Logout Success', type: true });        

        });
    },
});

export default authSlice.reducer;
