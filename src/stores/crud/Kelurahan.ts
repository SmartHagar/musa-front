/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "@/stores/auth/login";
// kelurahan
type Props = {
  page?: number;
  limit?: number;
  search?: string;
};

type Store = {
  dtKelurahan: any;
  showKelurahan: any;
  setKelurahan: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setShowKelurahan: (id: number | string) => Promise<{
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
};

const useKelurahan = create(
  devtools<Store>((set, get) => ({
    dtKelurahan: [],
    showKelurahan: [],
    setKelurahan: async ({ page = 1, limit = 10, search }) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/kelurahan`,
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtKelurahan: response.data.data }));
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
    setShowKelurahan: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/kelurahan/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((state) => ({ ...state, showKelurahan: response.data.data }));
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
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "post",
          url: `/kelurahan`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: row,
        });
        set((prevState) => ({
          dtKelurahan: {
            last_page: prevState.dtKelurahan.last_page,
            current_page: prevState.dtKelurahan.current_page,
            data: [res.data.data, ...prevState.dtKelurahan.data],
          },
        }));
        return {
          status: "berhasil tambah",
          data: res.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
    removeData: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "delete",
          url: `/kelurahan/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((prevState) => ({
          dtKelurahan: {
            last_page: prevState.dtKelurahan.last_page,
            current_page: prevState.dtKelurahan.current_page,
            data: prevState.dtKelurahan.data.filter(
              (item: any) => item.id !== id
            ),
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
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "PUT",
          url: `/kelurahan/${id}`,
          headers: { Authorization: `Bearer ${token}` },
          data: row,
        });
        set((prevState) => ({
          dtKelurahan: {
            last_page: prevState.dtKelurahan.last_page,
            current_page: prevState.dtKelurahan.current_page,
            data: prevState.dtKelurahan.data.map((item: any) => {
              if (item.id === id) {
                return {
                  ...item,
                  ...response.data.data,
                };
              } else {
                return item;
              }
            }),
          },
        }));
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

export default useKelurahan;
