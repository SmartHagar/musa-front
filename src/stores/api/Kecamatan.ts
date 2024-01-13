/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
// api kecamatan
type Props = {
  page?: number;
  limit?: number;
  search?: string;
};

type Store = {
  dtKecamatan: any;
  setKecamatan: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setKecamatanAll: ({ search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useKecamatanApi = create(
  devtools<Store>((set, get) => ({
    dtKecamatan: [],
    setKecamatan: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/kecamatan`,
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtKecamatan: response.data }));
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
    setKecamatanAll: async ({ search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/kecamatan/all`,
          params: {
            search,
          },
        });
        set((state) => ({ ...state, dtKecamatan: response.data }));
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

export default useKecamatanApi;
