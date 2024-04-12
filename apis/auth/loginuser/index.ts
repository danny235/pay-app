import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "";

const axiosInstance = axios.create({
  baseURL: BASE_API,
});

interface LoginData {
  email: string;
  password: string;
}

export interface UserData {
  avatar: string;
  isEmailVerified: boolean;
  hasSetPin: boolean;
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  username: string;
  createdAt: string;
}

const constructLoginData: (values: any) => LoginData = (values) => {
  return {
    email: values.email,
    password: values.password,
  };
};

export const logInUserRequest = async (values: any) => {
  let data = JSON.stringify(constructLoginData(values));

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const res = await axios(`https://api.100pay.co/api/v1/user/login`, config);

    console.log(res);

    return {
      message: "Login successful!",
      token: res.data,
    };
  } catch (err: any) {
    console.log("catch");

    console.log("createUser POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }

};

export const getUserData: (token: string) => Promise<UserData> = async (
  token: string
) => {
  try {
    const res = await axiosInstance("/user", {
      headers: {
        "Auth-Token": token,
      },
    });

    console.log(res.data, 'yola')

    return res.data;
  } catch (err: any) {
    console.log("catch");

    console.log("user logged in POST err", err);
    console.log(err.response.data);

    throw Error(err.response.daa);
  }
};
