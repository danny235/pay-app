import {createAsyncThunk, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {formatDateString} from '../../utils';
import { GetApp } from '../../apis/getuserdata';
import { act } from 'react-test-renderer';

export const fetchUserApps = createAsyncThunk(
  'user/fetchAdverts',
  async (token: string) => {
    const response = await GetApp(token);
    return response;
  },
);

type AccountBalanceType = 'naira' | 'pay-token';

interface UserProfile {
  name: string;
  email: string;
  payId: string;
  // Add more fields as needed
}

type UserAppType = {
  address: string;
  admins: any[]; // Assuming this can be an array of any type
  app_name: string;
  business_name: string;
  call_back: string;
  city: string;
  country: string;
  createdAt: string; // You might want to use Date type here if you parse the string into a Date object
  currency: string;
  description: string;
  fiat_balance: number;
  gateways: {
    name: string;
    id: string;
    publicKey: string;
    secretKey: string;
    // Add more properties as needed
  }[];
  keys: {
    pub_keys: {label: string}[];
    sk_keys: {label: string}[];
  };
  kycVerified: boolean;
  phone: string;
  postal: string;
  referralCode: string;
  status: string;
  suported_coins: any[]; // Assuming this can be an array of any type
  support_email: string;
  tokenBalance: number;
  user_id: string;
  verification_token: string;
  web_hook: string;
  website_address: string;
  __v: number;
  _id: string;
};




interface UserState {
  accountBalance: number;
  token: string;
  isLoggedIn: boolean;
  userOnboarded: boolean;
  accountBalanceType: AccountBalanceType;
  userProfile: UserProfile | null; // You might want to define a proper type for userProfile
  showAccountBalance: boolean;
  userApps: UserAppType[] | null;
  userAppsLoading: string,
  userAppsError: string | undefined,
  activeUserApp: UserAppType | null
}

const initialState: UserState = {
  accountBalance: 1000,
  token: '',
  isLoggedIn: false,
  userOnboarded: false,
  accountBalanceType: 'naira',
  userProfile: null,
  userApps:  null,
  activeUserApp: null,
  userAppsLoading: "idle",
  userAppsError: "",
  showAccountBalance: true,
  
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    toggleIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<any>) => {
      state.userProfile = action.payload;
    },
    updateUserOnboarded: state => {
      state.userOnboarded = true;
    },
    logOut: state => {
      state.token = '';
    },
    updateAccountBalanceType: (state, action) => {
        state.accountBalanceType = action.payload
    },
    updateShowAccountBalance: (state) => {
      state.showAccountBalance = !state.showAccountBalance
    },
    updateAccountBalance: (state, action) => {
      state.accountBalance = action.payload
    },

    updateActiveApps: (state, action) => {
      state.activeUserApp = action.payload
    }
 
  },

  extraReducers: (builder) => {

    /*----- Get user app ---------*/ 
    builder.addCase(fetchUserApps.pending, (state, action)=> {
      state.userAppsLoading = "loading"
    })

    builder.addCase(fetchUserApps.fulfilled, (state, action) => {
      state.userAppsLoading = "success"
      state.userApps = action.payload
      state.activeUserApp = action.payload[0]
      console.log(action.payload[0]);
    })

    builder.addCase(fetchUserApps.rejected, (state, action) => {
      state.userAppsLoading = "rejected"
      state.userAppsError = action.error.message
    })

    /*-----------*/ 
  }
});





export const {
  addToken,
  toggleIsLoggedIn,
  updateUserOnboarded,
  logOut,
  updateAccountBalanceType,
  updateShowAccountBalance,
  updateAccountBalance
} = userSlice.actions;

export default userSlice.reducer;
