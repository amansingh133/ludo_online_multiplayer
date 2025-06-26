import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "./Config";
import { encodeFormData } from "../utils/encodeFormData";
import { prepareHeaders } from "../utils/prepareHeaders";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.BASE_URL}`,
    prepareHeaders,
  }),

  tagTypes: [
    "User",
    "Auth",
    "Payment",
    "Banner",
    "Contest",
    "Referral",
    "Location",
  ],

  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () =>
        `${config.CLINT_API_URL}get-banners-userwise/${config.TYPE_OF_USER}?token=${config.TOKEN}&playstore=false`,
      providesTags: ["Banner"],
    }),

    getReferralIp: builder.query({
      query: () => `${config.CLINT_API_URL}referral-ip`,
      providesTags: ["Referral"],
    }),

    signup: builder.mutation({
      query: (data) => ({
        url: `${config.CLINT_API_URL}signup`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${config.CLINT_API_URL}login-phone`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: `${config.CLINT_API_URL}resend-phone`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["Auth"],
    }),

    submitOtp: builder.mutation({
      query: (data) => ({
        url: `${config.CLINT_API_URL}login`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    silentLogin: builder.query({
      query: () =>
        `${config.CLINT_API_URL}loggedin?token=${config.TOKEN}&type=${config.TYPE}&version=${config.VERSION}`,
      providesTags: ["User"],
    }),

    updateUid: builder.mutation({
      query: (data) => ({
        url: `${config.CLINT_API_URL}update-uid?token=${config.TOKEN}`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["User"],
    }),

    updateFcm: builder.mutation({
      query: (data) => ({
        url: `${config.CLINT_API_URL}update-fcm?token=${config.TOKEN}`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["User"],
    }),

    getFaq: builder.query({
      query: () => `${config.CLINT_API_URL}terms?token=${config.TOKEN}`,
      providesTags: ["User"],
    }),

    getWalletMoney: builder.query({
      query: () => `${config.CLINT_API_URL}total-money?token=${config.TOKEN}`,
      providesTags: ["Payment"],
    }),

    getPassbook: builder.query({
      query: () => `${config.CLINT_API_URL}all-money?token=${config.TOKEN}`,
      providesTags: ["Payment"],
    }),

    transferPayment: builder.mutation({
      query: (data) => ({
        url: `${config.CLINT_API_URL}transfer-rzx?token=${config.TOKEN}`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["Payment"],
    }),

    updateLocation: builder.mutation({
      query: (data) => ({
        url: `${config.CLINT_API_URL}update-location?token=${config.TOKEN}`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["Location"],
    }),

    getTransferPaymentDetails: builder.query({
      query: (toType) =>
        `${config.CLINT_API_URL}get-transfer-account-details?token=${config.TOKEN}&toType=${toType}`,
      providesTags: ["Payment"],
    }),

    contestJoin: builder.mutation({
      query: (data) => ({
        url: `${config.CLINT_API_URL}dicemaker/contest-join?token=${config.TOKEN}`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["Contest"],
    }),

    contestEnd: builder.mutation({
      query: (data) => ({
        url: `${config.CLINT_API_URL}right-answer?token=${config.TOKEN}`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["Contest"],
    }),

    customPayOrderGenerate: builder.mutation({
      query: (data) => ({
        url: `${config.CLINT_API_URL}generate-order?token=${config.TOKEN}`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["Payment"],
    }),

    paytmOrderGenerate: builder.mutation({
      query: (data) => ({
        url: `${config.CLINT_API_URL}paytm-generate-order?token=${config.TOKEN}`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["Payment"],
    }),

    paytmCallback: builder.mutation({
      query: (data) => ({
        url: `lagos/paytm-pay?token=${config.TOKEN}`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["Payment"],
    }),

    razorPaymentPage: builder.query({
      query: () => `pay?token=${config.TOKEN}`,
      providesTags: ["Payment"],
    }),

    razorPaymentSuccess: builder.query({
      query: () => "comely-payment-successful",
      providesTags: ["Payment"],
    }),

    razorPaymentFailed: builder.query({
      query: () => "comely-payment-failed",
      providesTags: ["Payment"],
    }),

    checkoutAddMoney: builder.mutation({
      query: (data) => ({
        url: `lagos/paytm-pay?token=${config.TOKEN}`,
        method: "POST",
        body: encodeFormData(data),
      }),
      invalidatesTags: ["Payment"],
    }),

    getLocationDetails: builder.query({
      query: () => "https://open.mapquestapi.com/geocoding/v1/reverse?key=",
      providesTags: ["Location"],
    }),

    getTnc: builder.query({
      query: () => "https://aimcomely.com/luri/terms.html",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useGetReferralIpQuery,
  useSignUpMutation,
  useLoginMutation,
  useResendOtpMutation,
  useSubmitOtpMutation,
  useSilentLoginQuery,
  useUpdateUidMutation,
  useUpdateFcmMutation,
  useGetFaqQuery,
  useGetWalletMoneyQuery,
  useGetPassbookQuery,
  useTransferPaymentMutation,
  useUpdateLocationMutation,
  useGetTransferPaymentDetailsQuery,
  useContestJoinMutation,
  useContestEndMutation,
  useCustomPayOrderGenerateMutation,
  usePaytmOrderGenerateMutation,
  usePaytmCallbackMutation,
  useRazorPaymentPageQuery,
  useRazorPaymentSuccessQuery,
  useRazorPaymentFailedQuery,
  useCheckoutAddMoneyMutation,
  useGetLocationDetailsQuery,
  useGetTncQuery,
} = api;
