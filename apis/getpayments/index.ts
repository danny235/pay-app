// get user token

import axios from "axios";


export type getPaymentsT = {
  token: string;
  apiKey: string | undefined;
};

export async function getPayments({token, apiKey}: getPaymentsT) {
  try {
    const response = await axios.get(
      'https://api.100pay.co/api/v1/pay/crypto/app/payments',
      {
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': apiKey,
          'Auth-Token': token,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

