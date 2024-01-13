/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { auth } from "@/services/baseURL";
import Cookies from "js-cookie";

// type data login
interface dataLogin {
  email: string;
  password: string | number;
}
interface Store {
  setToken: () => Promise<any>;
  setLogin: (
    data: dataLogin
  ) => Promise<{ status: string; data?: any; error?: any }>;
  cekToken: () => Promise<{ status: string; data?: any; error?: any }>;
}

const useLogin = create(
  devtools<Store>((set, get) => ({
    setToken: async () => {
      const getToken = Cookies.get("token");
      return getToken;
    },
    setLogin: async (data) => {
      try {
        const response = await auth({
          method: "post",
          url: `/login`,
          data,
        });
        return {
          status: "success",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    cekToken: async () => {
      const token = await get().setToken();
      try {
        const response = await auth({
          method: "post",
          url: `/cek-token`,
          headers: { Authorization: `Bearer ${token}` },
        });
        return {
          status: "success",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
  }))
);

export default useLogin;
