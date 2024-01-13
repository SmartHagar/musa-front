/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
// api beritaAcara
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  tahun?: string | number;
  semester?: string;
  dosen_id?: string;
};

type Store = {
  dtBeritaAcara: any;
  setBeritaAcaraByDosen: ({ tahun, semester, dosen_id }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useBeritaAcaraApi = create(
  devtools<Store>((set, get) => ({
    dtBeritaAcara: [],
    setBeritaAcaraByDosen: async ({ tahun, semester, dosen_id }) => {
      try {
        const response = await api({
          method: "get",
          url: `/berita-acara/by-dosen`,
          params: {
            tahun,
            semester,
            dosen_id,
          },
        });
        set((state) => ({ ...state, dtBeritaAcara: response?.data }));
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

export default useBeritaAcaraApi;
