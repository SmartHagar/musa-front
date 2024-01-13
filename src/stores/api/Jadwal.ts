/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
// api jadwal
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  tahun?: string | number;
  semester?: string;
  dosen_id?: string;
};

type Store = {
  dtJadwal: any;
  setJadwal: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setJadwalAll: ({ search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setJadwalByThnSmt: ({ tahun, semester }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setJadwalByDosen: ({ tahun, semester, dosen_id }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setJadwalByRps: ({ tahun, semester, dosen_id }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useJadwalApi = create(
  devtools<Store>((set, get) => ({
    dtJadwal: [],
    setJadwal: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/jadwal`,
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtJadwal: response.data }));
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
    setJadwalAll: async ({ search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/jadwal/all`,
          params: {
            search,
          },
        });
        set((state) => ({ ...state, dtJadwal: response.data }));
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
    setJadwalByThnSmt: async ({ tahun, semester }) => {
      try {
        const response = await api({
          method: "get",
          url: `/jadwal/thn-smt`,
          params: {
            tahun,
            semester,
          },
        });
        set((state) => ({ ...state, dtJadwal: response.data }));
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
    setJadwalByDosen: async ({ tahun, semester, dosen_id }) => {
      try {
        const response = await api({
          method: "get",
          url: `/jadwal/by-dosen`,
          params: {
            tahun,
            semester,
            dosen_id,
          },
        });
        set((state) => ({ ...state, dtJadwal: response?.data }));
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
    setJadwalByRps: async ({ tahun, semester, dosen_id }) => {
      try {
        const response = await api({
          method: "get",
          url: `/jadwal/by-rps`,
          params: {
            tahun,
            semester,
            dosen_id,
          },
        });
        set((state) => ({ ...state, dtJadwal: response?.data }));
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

export default useJadwalApi;
