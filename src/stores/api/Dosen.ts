/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
// api dosen
type Props = {
  page?: number;
  limit?: number;
  search?: string;
};

type Store = {
  dtDosen: any;
  setDosen: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setDosenAll: ({ search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useDosenApi = create(
  devtools<Store>((set, get) => ({
    dtDosen: [],
    setDosen: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/dosen`,
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtDosen: response.data }));
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
    setDosenAll: async ({ search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/dosen/all`,
          params: {
            search,
          },
        });
        set((state) => ({ ...state, dtDosen: response.data }));
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

export default useDosenApi;
