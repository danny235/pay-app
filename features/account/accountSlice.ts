import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {formatDateString} from '../../utils';
import {GetApp} from '../../apis/getuserdata';
import {getUserData} from '../../apis/auth/loginuser';
import {getPayments, getPaymentsT} from '../../apis/getpayments';
import {ChargeT, getCharge} from '../../apis/gettransactions';
import {getBankRequest, GetBankT} from '../../apis/createbank';

export const fetchPayments = createAsyncThunk(
  'user/fetchPayments',
  async ({token, apiKey}: getPaymentsT) => {
    const response = await getPayments({token, apiKey});
    return response;
  },
);

export const fetchCharge = createAsyncThunk(
  'user/fetchCharge',
  async ({token, apiKey}: ChargeT) => {
    const response = await getCharge({token, apiKey});
    return response;
  },
);

export const fetchBanks = createAsyncThunk(
  'user/fetchBanks',
  async ({token, apiKey}: GetBankT) => {
    const response = await getBankRequest({token, apiKey});
    return response;
  },
);

type BillingType = {
  currency: string;
  vat: number;
  pricing_type: string;
  description: string;
  amount: string;
  // Add more properties as needed
};

type CustomerType = {
  user_id: string;
  name: string;
  phone: string;
  email: string;
  // Add more properties as needed
};

type StatusType = {
  context: {
    status: string;
    value: number;
  };
  value: string;
  total_paid: number;
};

type MetadataType = {
  is_approved: string;
  // Add more properties as needed
};

type Data = {
  network: string;
  transaction_id: string;
  // Add more properties as needed
};

type Block = {
  height: number;
  hash: string;
  // Add more properties as needed
};

type Value = {
  local: {
    amount: number;
    currency: string;
  };
  crypto: {
    amount: number;
    currency: string;
  };
};
type BankType = {
  account_number: string;
  bank_name: string;
  currency: string;
  userId: string;
  __v: number;
  _id: string;
};

export type ChargeType = {
  app_id: string;
  billing: BillingType;
  call_back_url: string;
  chargeId: string;
  charge_source: string;
  createdAt: string;
  customer: CustomerType;
  metadata: MetadataType;
  payments: any[]; // Adjust the type accordingly
  ref_id: string;
  status: StatusType;
  userId: string;
  __v: number;
  _id: string;
};

type PaymentType = {
  retries: number;
  acknowledged: boolean;
  dispatched: boolean;
  _id: string;
  chargeId: string;
  createdAt: string;
  cryptoChargeId: string;
  data: Data;
  appId: string;
  block: Block;
  charge: ChargeType;
  network: string;
  status: string;
  timestamp: string;
  transaction_id: string;
  value: Value;
  reference: string;
  __v: number;
};

type AccountType = {
  charges: ChargeType[] | null;
  chargesLoading: string;
  chargesError: string | undefined;
  payments: PaymentType[] | null;
  paymentsLoading: string;
  paymentsError: string | undefined;
  bankAccounts: BankType[] | null;
  bankAccountsLoading: string;
  bankAccountsError: string | undefined;
};

const initialState: AccountType = {
  charges: null,
  chargesLoading: 'idle',
  chargesError: '',
  payments: null,
  paymentsLoading: 'idle',
  paymentsError: '',
  bankAccounts: null,
  bankAccountsLoading: 'idle',
  bankAccountsError: '',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},

  extraReducers: builder => {
    /*----- Get Charge ---------*/
    builder.addCase(fetchCharge.pending, (state, action) => {
      state.chargesLoading = 'loading';
    });

    builder.addCase(fetchCharge.fulfilled, (state, action) => {
      state.chargesLoading = 'success';
      state.charges = action.payload.slice().reverse();
    });

    builder.addCase(fetchCharge.rejected, (state, action) => {
      state.chargesLoading = 'rejected';
      state.chargesError = action.error.message;
    });

    /*-----------*/

    /*----- Get payments ---------*/
    builder.addCase(fetchPayments.pending, (state, action) => {
      state.paymentsLoading = 'loading';
    });

    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      state.paymentsLoading = 'success';
      state.payments = action.payload.slice().reverse();
    });

    builder.addCase(fetchPayments.rejected, (state, action) => {
      state.paymentsLoading = 'rejected';
      state.paymentsError = action.error.message;
    });

    /*-----------*/

    /*----- Get banks ---------*/
    builder.addCase(fetchBanks.pending, (state, action) => {
      state.bankAccountsLoading = 'loading';
    });

    builder.addCase(fetchBanks.fulfilled, (state, action) => {
      state.bankAccountsLoading = 'success';
      state.bankAccounts = action.payload;
    });

    builder.addCase(fetchBanks.rejected, (state, action) => {
      state.bankAccountsLoading = 'rejected';
      state.bankAccountsError = action.error.message;
      console.log(action.error.message);
    });

    /*-----------*/
  },
});

export const {} = accountSlice.actions;

export default accountSlice.reducer;
