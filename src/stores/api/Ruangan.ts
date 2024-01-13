/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
// api ruangan
type Props = {
  page?: number;
  limit?: number;
  search?: string;
};

type Store = {
  dtRuangan: any;
  setRuangan: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setRuanganAll: ({ search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useRuanganApi = create(
  devtools<Store>((set, get) => ({
    dtRuangan: [],
    setRuangan: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/ruangan`,
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtRuangan: response.data }));
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
    setRuanganAll: async ({ search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/ruangan/all`,
          params: {
            search,
          },
        });
        set((state) => ({ ...state, dtRuangan: response.data }));
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

export default useRuanganApi;
