/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
// api matkul
type Props = {
  page?: number;
  limit?: number;
  search?: string;
};

type Store = {
  dtMatkul: any;
  setMatkul: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setMatkulAll: ({ search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useMatkulApi = create(
  devtools<Store>((set, get) => ({
    dtMatkul: [],
    setMatkul: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/matkul`,
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtMatkul: response.data }));
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
    setMatkulAll: async ({ search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/matkul/all`,
          params: {
            search,
          },
        });
        set((state) => ({ ...state, dtMatkul: response.data }));
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

export default useMatkulApi;
