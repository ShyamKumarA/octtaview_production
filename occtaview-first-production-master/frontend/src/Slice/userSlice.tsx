import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../Constant';

// Add new user

interface NewUser {
    name: string;
    username: string;
    email: string;
    phone: string;
    address: string;
    transactionpassword: string;
    Password: string;
}

interface AddNewUserState {
    loading: boolean;
    data: any;
    error: string | null;
}

const initialState: AddNewUserState = {
    loading: false,
    data: null,
    error: null,
};

export const addNewUser = createAsyncThunk('addNewUser', async (user: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };
    console.log(user.transactionPassword);

    const response = await axios.post(
        `${URL}/api/user/add-user`,
        {
            username: user.userName,
            email: user.email,
            phone: user.phone,
            address: user.address,
            transactionPassword: user.transactionPassword,
            password: user.password,
        },
        config
    );

    return response.data;
});

// redux
const getAddNewUser = createSlice({
    name: 'getAddNewUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addNewUser.rejected, (state, action: any) => {
                state.loading = false;
                if (action.error && action.error.message === 'Request failed with status code 401') {
                    state.error = 'User already exists!';
                } else {
                    state.error = 'An error occurred while processing your request.';
                }
            });
    },
});

// export const selectAddNewUser = (state: any) => state.getAddNewUser;

export const getAddNewUserReducer = getAddNewUser.reducer;

//2..... Add Fund

interface NewFund {
    amount: string;
    transactionid: string;
}

interface AddNewFundState {
    loading: boolean;
    data: any;
    error: string | null;
}

const initialState2: AddNewFundState = {
    loading: false,
    data: null,
    error: null,
};

export const addNewFund = createAsyncThunk('addNewFund', async (fund: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(
        `${URL}/api/user/add-package-by-user`,
        {
            amount: fund.amount,
            transactionCode: fund.transactionid,
        },
        config
    );

    return response.data;
});

// redux
const getAddNewFund = createSlice({
    name: 'getAddNewFund',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewFund.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewFund.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addNewFund.rejected, (state, action: any) => {
                state.loading = false;
                if (action.error && action.error.message === 'Your specific error message') {
                    // Handle specific error
                    state.error = 'Your specific error message';
                } else {
                    state.error = 'An error occurred while processing your request.';
                }
            });
    },
});

// export const selectAddNewFund = (state: any) => state.getAddNewFund;

export const getAddNewFundReducer = getAddNewFund.reducer;

//2.....View mt profile

// Define the type for user profile data
interface UserProfileData {
    name: string;
    email: string;
    phone: number;
    address: string;
    directIncome: number;
    packageName: string;
    levelRoi: number;
    capitalAmount: number;
    ownSponserId: string;
    dailyBonus: number;
    // Add other profile-related fields here
}

// Define the type for the user profile information in the state
interface UserProfileState {
    data: UserProfileData | null;
    loading: boolean;
    error: boolean;
}

const initialState3: UserProfileState = {
    data: null,
    loading: false,
    error: false,
};

// Redux action to get user profile
export const fetchUserProfile = createAsyncThunk<UserProfileData>('fetchUserProfile', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/user/view-user-profile`, config);

    return response.data;
});

// Redux
const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: initialState3,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

// Export reducer only
export const userProfileReducer = userProfileSlice.reducer;
