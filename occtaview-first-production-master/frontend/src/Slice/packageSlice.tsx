import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../Constant';

// Define the type for add fund history data
interface AddFundHistoryData {
    slno: number;
    date: string;
    orderid: string;
    txnid: string;
    amount: number;
    status: boolean;
}

// Define the type for the add fund history information in the state
interface AddFundHistoryState {
    data: AddFundHistoryData[] | null;
    loading: boolean;
    error: string | null;
}

// Redux action to get add fund history
export const fetchAddFundHistory = createAsyncThunk('fetchAddFundHistory', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/user/addfundHistory`, config);

    console.log(response.data);

    return response.data;
});

// Redux
const addFundHistorySlice = createSlice({
    name: 'addFundHistory',
    initialState: { data: null, loading: false, error: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddFundHistory.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchAddFundHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAddFundHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

// Export reducer only
export const addFundHistoryReducer = addFundHistorySlice.reducer;

//wallet withdraw History

interface withdrawHistoryData {
    slno: number;
    date: string;
    orderid: string;
    txnid: string;
    amount: number;
    status: boolean;
}

// Define the type for the add fund history information in the state
interface withdrawHistoryState {
    data: withdrawHistoryData[] | null;
    loading: boolean;
    error: string | null;
}

// Redux action to get add fund history
export const fetchWithdrawHistory = createAsyncThunk('fetchWithdrawHistory', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/user/wallet-Withdraw-Report`, config);

    console.log(response.data);

    return response.data;
});

// Redux
const withdrawHistorySlice = createSlice({
    name: 'withdrawFundHistory',
    initialState: { data: null, loading: false, error: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWithdrawHistory.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchWithdrawHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchWithdrawHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

// Export reducer only
export const withdrawHistoryreducer = withdrawHistorySlice.reducer;

//wallet withdraw History

interface capitalWithdrawHistoryData {
    slno: number;
    date: string;
    orderid: string;
    txnid: string;
    amount: number;
    status: boolean;
}

// Define the type for the add fund history information in the state
interface capitalWithdrawHistoryState {
    data: capitalWithdrawHistoryData[] | null;
    loading: boolean;
    error: string | null;
}

// Redux action to get add fund history
export const fetchCapitalWithdrawHistory = createAsyncThunk('fetchCapitalWithdrawHistory', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/user/capital-Withdraw-Report`, config);

    console.log(response.data);

    return response.data;
});

// Redux
const capitalWithdrawHistorySlice = createSlice({
    name: 'capitalwithdrawFundHistory',
    initialState: { data: null, loading: false, error: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCapitalWithdrawHistory.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchCapitalWithdrawHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCapitalWithdrawHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

// Export reducer only
export const capitalWithdrawHistoryreducer = capitalWithdrawHistorySlice.reducer;

// ROI income history

interface RoiIncomeHistoryData {
    name: string;
    _id: string;
    creditedAmount: number;
    createdAt: string;
    updatedAt: string;
}

// Define the type for the add fund history information in the state
interface RoiHistoryState {
    data: RoiIncomeHistoryData[] | any;
    loading: boolean;
    error: string | null;
}

// Redux action to get add fund history
export const fetchROIincome = createAsyncThunk('fetchROIincome', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/user/ROI-History`, config);

    console.log(response.data);

    return response.data;
});

// Redux
const RoiincomeSlice = createSlice({
    name: 'RoiincomeHistory',
    initialState: { data: null, loading: false, error: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchROIincome.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchROIincome.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchROIincome.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

// Export reducer only
export const RoiincomeSlicereducer = RoiincomeSlice.reducer;
