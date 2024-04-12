"use client";

import { PaymentData } from "@/types/payment";
import { COUNTRIES, CURRENCIES, shop100Pay } from "@100pay-hq/checkout";
// const API_KEY = process.env.NEXT_PUBLIC_100PAY_API_KEY;
// import { v4 as uuidv4 } from "uuid";

// accept data with onclose, onerror, oncallback callbacks
const payWith100Pay = async (
  data: PaymentData,
  onPayClose?: () => void,
  onPayError?: (error: any) => void,
  onPayCallback?: (reference: string) => void
) => {
  if (typeof window === "undefined") return;
  if (!data.apiKey) throw new Error("API_KEY is not set");

  let result = {};

  shop100Pay.setup(
    {
      ref_id: Math.ceil(Math.random() * 1000000).toString(),
      api_key: data.apiKey,
      billing: {
        amount: data.billing.amount,
        currency: data.billing.currency as CURRENCIES,
        description: data.billing.description,
        country: data.billing.country as COUNTRIES,
        pricing_type: data.billing.pricing_type,
      },
      customer: {
        user_id: data.customer.user_id,
        name: data.customer.name,
        email: data.customer.email,
        phone: data.customer.phone,
      },
      metadata: {
        is_approved: "yes",
        order_id: "OR2", // optional
        charge_ref: "REF", // optionalm, you can add more fields
      },
      call_back_url: "http://localhost:8000/verifyorder/",
      onClose: () => {
        // alert("User closed payment modal.");
        onPayClose && onPayClose();
      },
      callback: (reference) => {
        // alert(`Transaction successful with id: ${reference}`);

        onPayCallback && onPayCallback(reference);
      },
      onError: (error) => {
        console.log(error);
        // alert("Sorry something went wrong pls try again.");
        onPayError && onPayError(error);
      },
    },
    {
      maxWidth: "500px",
    }
  );

  return result;
};

export default payWith100Pay;
