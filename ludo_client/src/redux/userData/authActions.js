import { setUserData, clearUserData } from "./userDataSlice";
import {
  useLoginMutation,
  useSignUpMutation,
  useSilentLoginQuery,
  useResendOtpMutation,
  useSubmitOtpMutation,
} from "../../api/apiSlice";

export const loginUser = data => asy