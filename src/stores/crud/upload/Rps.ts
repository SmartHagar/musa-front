/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "@/stores/auth/login";

// crud rps

type Props = {
  id?: number | string;
  page?: number;
  limit?: number;
  search?: string;
  semester?: string;
  tahun?: string | number;
};

type Store = {
  dtRps: any;
  showRps: any;
  setRps: ({ page, limit, search, tahun, semester }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setShowRps: ({ id, tahun, semester }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  addData: (data: any) => Promise<{ status: string; data?: any; error?: any }>;
  removeData: (
    data: any
  ) => Promise<{ status: string; data?: any; error?: any }>;
  updateData: (
    id: number | string,
    data: any
  ) => Promise<{ status: string; data?: any; error?: any }>;
  setFormData: any;
};

const useRps = create(
  devtools<Store>((set, get) => ({
    setFormData: (row: any) => {
      const formData = new FormData();
      formData.append("jadwal_id", row.jadwal_id);
      formData.append("file", row.file);
      return formData;
    },
    dtRps: [],
    showRps: [],
    setRps: async ({ page = 1, limit = 10, search, tahun, semester }) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/upload/rps`,
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit,
            page,
            search,
            tahun,
            semester,
          },
        });
        set((state) => ({ ...state, dtRps: response.data.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response?.data,
        };
      }
    },
    setShowRps: async ({ id, tahun, semester }) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/upload/rps/${id}`,
          headers: { Authorization: `Bearer ${token}` },
          params: {
            tahun,
            semester,
          },
        });
        console.log({ response });
        set((state) => ({ ...state, showRps: response.data.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response?.data,
        };
      }
    },
    addData: async (row) => {
      const formData = row?.foto ? get().setFormData(row) : row;
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "post",
          url: `/upload/rps`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        const dosen_id = res?.data?.data?.jadwal?.dosen_id;
        await get().setShowRps(dosen_id);
        return {
          status: "berhasil tambah",
          data: res.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response?.data,
        };
      }
    },
    removeData: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "delete",
          url: `/upload/rps/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((prevState: any) => ({
          dtRps: {
            last_page: prevState.dtRps.last_page,
            current_page: prevState.dtRps.current_page,
            data: prevState.dtRps.data.filter((item: any) => item.id !== id),
          },
        }));
        return {
          status: "berhasil hapus",
          data: res.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
    updateData: async (id, row) => {
      delete row.id;
      const formData = row?.foto ? get().setFormData(row) : row;
      const token = await useLogin.getState().setToken();
      const headersImg = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await crud({
          url: `/upload/rps/${id}`,
          method: "post",
          headers: row?.foto
            ? headersImg
            : {
                Authorization: `Bearer ${token}`,
              },
          data: formData,
          params: {
            _method: "PUT",
          },
        });
        const dosen_id = response?.data?.data?.jadwal?.dosen_id;
        const jadwal = response?.data?.data?.jadwal;
        await get().setShowRps(dosen_id);
        await get().setRps({
          tahun: jadwal?.tahun,
          semester: jadwal?.semester,
        });
        return {
          status: "berhasil update",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
  }))
);

export default useRps;
