import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {formatDateString} from '../../utils';

type AccountBalanceType = 'naira' | 'pay-token';

interface UserProfile {
  name: string;
  email: string;
  payId: string;
  // Add more fields as needed
}

interface UserState {
  accountBalance: number;
  token: string;
  isLoggedIn: boolean;
  userOnboarded: boolean;
  accountBalanceType: AccountBalanceType;
  userProfile: UserProfile; // You might want to define a proper type for userProfile
  showAccountBalance: boolean;
}

const initialState: UserState = {
  accountBalance: 1000,
  token: '',
  isLoggedIn: false,
  userOnboarded: false,
  accountBalanceType: 'naira',
  userProfile: {
    name: "Daniel Barima",
    email: "danielb@gmail.com",
    payId: "PsfEi"
  },
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
    }
 
  },
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
