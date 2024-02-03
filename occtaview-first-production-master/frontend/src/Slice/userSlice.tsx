import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../Constant';
import { log } from 'console';

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

//3.....View mt profile

// Define the type for user profile data
interface UserProfileData {
    id: string;
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
    totalIncome: number;
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

//4...... change PAssword
interface UserData {
    password: any;
    confirmPassword: any;
}

// Define the type for the add fund history information in the state
interface UserState {
    data: UserData[] | null;
    loading: boolean;
    error: any | null;
}

// Redux action to get add fund history
export const fetchChangePassword = createAsyncThunk('fetchChangePassword', async (data: UserData) => {
    const { password, confirmPassword } = data;

    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(
        `${URL}/api/user/change-password`,
        {
            password,
            confirmPassword,
        },
        config
    );
    console.log(response);

    return response;
});

// Redux
// Redux
const addchangePassword = createSlice({
    name: 'addchange',
    initialState: { data: null, loading: false, error: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChangePassword.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchChangePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(fetchChangePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

// Export reducer only
export const addchangePasswordreducer = addchangePassword.reducer;

// 5-------------- change transaction password

interface UserDatas {
    currentTransactionPassword: any;
    newTransactionPassword: any;
    confirmTransactionPassword: any;
    UserInfo: any;
}

// Define the type for the add fund history information in the state
interface UserState {
    datas: UserDatas[] | null;
    loading: boolean;
    error: any | null;
}

// Redux
export const fetchTransactionChangePassword = createAsyncThunk('fetchChangePassword', async (datas: any) => {
    const { currentTransactionPassword, newTransactionPassword, confirmTransactionPassword } = datas;

    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(
        `${URL}/api/user/transactonpassword`,
        {
            currentTransactionPassword,
            newTransactionPassword,
            confirmTransactionPassword,
        },
        config
    );

    return response.data;
});

// Redux
const AddChangeTransactionPassword = createSlice({
    name: 'addchangeTransaction',
    initialState: { data: null, loading: false, error: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionChangePassword.pending, (state) => {
                state.loading = true;
                state.error = false; // Reset error on pending
            })
            .addCase(fetchTransactionChangePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchTransactionChangePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = true; // Store error message
            });
    },
});

// Export reducer only
export const addchangeTransactionPasswordreducer = AddChangeTransactionPassword.reducer;

//6......... User Team

interface UserTeam {
    _id: string;
    username: string;
    email: string;
    phone: number;
    address: string;
    ownSponsorId: string;
    packageAmount: number;
    userStatus: 'pending' | 'approved' | 'rejected'; // Update the possible values based on your application logic
    packageName: string;
}

interface UserTeamState {
    data: UserProfileData[] | null;
    loading: boolean;
    error: boolean;
}

const initialStateDirectTeam: UserTeamState = {
    data: null,
    loading: false,
    error: false,
};

// Redux action to get AlL team
export const getAllUsers = createAsyncThunk<UserProfileData[]>('getAllUsers', async () => {
    // Retrieve token from localStorage (similar to fetchUserProfile action)
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/user/view-childs`, config);

    return response.data;
});

// Redux
const getAllUsersSlice = createSlice({
    name: 'getAllUsersSlice',
    initialState: initialStateDirectTeam,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

// Export reducer only
export const getAllUsersReducer = getAllUsersSlice.reducer;

//7........... Direct Income

interface directIncome {
    directIncome: [];
    msg: String;
    sts: String;
}

// Define the type for the direct income state
interface DirectIncomeState {
    data: directIncome | null;
    loading: boolean;
    error: boolean;
}

// Initial state for the direct income slice
const initialStateDirectIncome: DirectIncomeState = {
    data: null,
    loading: false,
    error: false,
};

// Redux action to fetch direct income
export const fetchDirectIncome = createAsyncThunk<directIncome[]>('fetchDirectIncome', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    // Adjust the API endpoint according to your backend
    const response = await axios.get(`${URL}/api/user/view-direct-referal-history`, config);

    return response.data;
});

// Redux slice for direct income
const directIncomeSlice = createSlice({
    name: 'directIncome',
    initialState: {
        loading: false,
        data: {},
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDirectIncome.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchDirectIncome.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDirectIncome.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

// Export reducer only
export const directIncomeReducer = directIncomeSlice.reducer;

// 8.............LEVEL INCOME-------1-------

interface levelIncome1 {
    levelIncome: [];
    msg: String;
    sts: String;
}

// Define the type for the direct income state
interface LevelIncomeState1 {
    data: levelIncome1 | null;
    loading: boolean;
    error: boolean;
}

// Initial state for the direct income slice
const initialStateLevelIncome1: LevelIncomeState1 = {
    data: null,
    loading: false,
    error: false,
};

// Redux action to fetch direct income
export const fetchLevelIncome1 = createAsyncThunk<directIncome[]>('fetchLevelIncome', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    // Adjust the API endpoint according to your backend
    const response = await axios.get(`${URL}/api/user/view-level1-Report`, config);

    return response.data;
});

// Redux slice for direct income
const levelIncomeSlice1 = createSlice({
    name: 'levelIncome1',
    initialState: {
        loading: false,
        data: {},
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLevelIncome1.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchLevelIncome1.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchLevelIncome1.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

// Export reducer only
export const levelIncomeReducer1 = levelIncomeSlice1.reducer;

// -----------------levelincome2-------------------

interface levelIncome2 {
    levelIncome2: [];
    msg: String;
    sts: String;
}

// Define the type for the direct income state
interface LevelIncomeState2 {
    data: levelIncome2 | null;
    loading: boolean;
    error: boolean;
}

// Initial state for the direct income slice
const initialStateLevelIncome2: LevelIncomeState2 = {
    data: null,
    loading: false,
    error: false,
};

// Redux action to fetch direct income
export const fetchLevelIncome2 = createAsyncThunk<directIncome[]>('fetchLevelIncome', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    // Adjust the API endpoint according to your backend
    const response = await axios.get(`${URL}/api/user/view-level2-Report`, config);

    return response.data;
});

// Redux slice for direct income
const levelIncomeSlice2 = createSlice({
    name: 'levelIncome2',
    initialState: {
        loading: false,
        data: {},
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLevelIncome2.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchLevelIncome2.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchLevelIncome2.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

// Export reducer only
export const levelIncomeReducer2 = levelIncomeSlice2.reducer;

// ------------------levelincome3------------------------

interface levelIncome3 {
    levelIncome2: [];
    msg: String;
    sts: String;
}

// Define the type for the direct income state
interface LevelIncomeState3 {
    data: levelIncome2 | null;
    loading: boolean;
    error: boolean;
}

// Initial state for the direct income slice
const initialStateLevelIncome3: LevelIncomeState2 = {
    data: null,
    loading: false,
    error: false,
};

// Redux action to fetch direct income
export const fetchLevelIncome3 = createAsyncThunk<directIncome[]>('fetchLevelIncome', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    // Adjust the API endpoint according to your backend
    const response = await axios.get(`${URL}/api/user/view-level3-Report`, config);

    return response.data;
});

// Redux slice for direct income
const levelIncomeSlice3 = createSlice({
    name: 'levelIncome3',
    initialState: {
        loading: false,
        data: {},
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLevelIncome3.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchLevelIncome3.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchLevelIncome3.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

// Export reducer only
export const levelIncomeReducer3 = levelIncomeSlice3.reducer;

//9..... withdraw Wallet

interface WithdrawFund {
    amount: string;
    transactionid: string;
}

interface WithDrawFundState {
    loading: boolean;
    data: any;
    error: string | null;
}

const initialState4: WithDrawFundState = {
    loading: false,
    data: null,
    error: null,
};

export const WithdrawFunds = createAsyncThunk('addNewFund', async (fund: any) => {
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
const getWithdrawFund = createSlice({
    name: 'getAddNewFund',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(WithdrawFunds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(WithdrawFunds.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(WithdrawFunds.rejected, (state, action: any) => {
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

export const getWithdrawFundreducer = getWithdrawFund.reducer;

// capital Withdraw

interface capitalWithdrawFund {
    amount: string;
    transactionid: string;
}

interface capitalWithDrawFundState {
    loading: boolean;
    data: any;
    error: string | null;
}

const initialState5: capitalWithDrawFundState = {
    loading: false,
    data: null,
    error: null,
};

export const capitalWithdrawFunds = createAsyncThunk('addNewFund', async (fund: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(
        `${URL}/api/user/withdraw-capital`,
        {
            amount: fund.amount,
            transactionCode: fund.transactionid,
        },
        config
    );

    return response.data;
});

// redux
const getCapitalWithdrawFund = createSlice({
    name: 'getcapitalwithdraw',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(capitalWithdrawFunds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(capitalWithdrawFunds.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(capitalWithdrawFunds.rejected, (state, action: any) => {
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

export const getCapitalWithdrawFundreducer = getCapitalWithdrawFund.reducer;

// referrel users

interface NewReferal {
    name: string;
    username: string;
    email: string;
    phone: string;
    address: string;
    transactionpassword: string;
    Password: string;
}

interface AddNewReferalState {
    loading: boolean;
    data: any;
    error: string | null;
}

const initialState6: AddNewReferalState = {
    loading: false,
    data: null,
    error: null,
};

export const addNewReferal = createAsyncThunk('newreferal', async (user: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(
        `${URL}/api/user/add-referal-user?id=${user.id}`,
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
const getNewReferalSlice = createSlice({
    name: 'getNewReferal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewReferal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewReferal.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addNewReferal.rejected, (state, action: any) => {
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

export const getNewReferalReducer = getNewReferalSlice.reducer;

// -----------------------verify user----------------

interface VerifyUser {
    name: string;
    username: string;
    email: string;
    phone: string;
    address: string;
    transactionpassword: string;
    Password: string;
}

interface AddNewVerifyState {
    loading: boolean;
    data: any;
    error: string | null;
}

const initialState7: AddNewVerifyState = {
    loading: false,
    data: null,
    error: null,
};

export const checkNewVerify = createAsyncThunk('checkverify', async (user: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(
        `${URL}/api/user/verify-user`,
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
const getCheckNewVerifySlice = createSlice({
    name: 'getNewverify',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkNewVerify.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkNewVerify.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(checkNewVerify.rejected, (state, action: any) => {
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

export const getCheckNewVerifySlicereducer = getCheckNewVerifySlice.reducer;
