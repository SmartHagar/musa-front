/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
// api kelengkapan
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  dosen_id?: string | number;
  tahun?: string | number;
  semester?: string;
};

type Store = {
  dtKelengkapan: any;
  setKelengkapan: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setKelengkapanAll: ({ search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useKelengkapanApi = create(
  devtools<Store>((set, get) => ({
    dtKelengkapan: [],
    setKelengkapan: async ({
      page = 1,
      limit = 10,
      search,
      dosen_id,
      tahun,
      semester,
    }) => {
      try {
        const response = await api({
          method: "get",
          url: `/kelengkapan`,
          params: {
            limit,
            page,
            search,
            dosen_id,
            tahun,
            semester,
          },
        });
        set((state) => ({ ...state, dtKelengkapan: response.data.data }));
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
    setKelengkapanAll: async ({ search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/kelengkapan/all`,
          params: {
            search,
          },
        });
        set((state) => ({ ...state, dtKelengkapan: response.data }));
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

export default useKelengkapanApi;
