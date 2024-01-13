/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";

type Props = {
  page?: number;
  limit?: number;
  search?: string;
};

type Store = {
  dtProdi: any;
  setProdi: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setProdiAll: ({ search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useProdiApi = create(
  devtools<Store>((set, get) => ({
    dtProdi: [],
    setProdi: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/prodi`,
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtProdi: response.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    setProdiAll: async ({ search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/prodi/all`,
          params: {
            search,
          },
        });
        set((state) => ({ ...state, dtProdi: response.data }));
        return {
          status: "berhasil",
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

export default useProdiApi;
