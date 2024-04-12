import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const axiosInstance = axios.create({
  baseURL: BASE_API,
});

let token: string | null;
if (typeof window !== "undefined") token = localStorage.getItem("token");

interface CreateBank {
  bank_name: string;
  account_number: string;
  account_name: any;
  currency: any;
}

const constructCreateBank: (values: any) => CreateBank = (values) => {
  return {
    bank_name: values.bankName,
    account_number: values.accountNumber,
    account_name: values.accountName,
    currency: "NGN",
  };
};

export const createBankRequest = async (values: any) => {
  let data = JSON.stringify(constructCreateBank(values));

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
      "Auth-Token": token,
    },
    data: data,
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/pay/bank_account`,
      config
    );

    return {
      message: "Bank Created!",
      data: res.data,
    };
  } catch (err: any) {
    console.log("catch");

    console.log("bank creation POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};

export const getBankRequest = async (token: any) => {
  let config = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
      "Auth-Token": token,
    },
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/pay/bank_accounts`,
      config
    );

    return {
      message: "banks fetched!",
      status: 200,
      data: res.data,
    };
  } catch (err: any) {
    console.log("catch");

    console.log("bank fetching POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};
