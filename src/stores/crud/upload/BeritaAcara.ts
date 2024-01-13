/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "@/stores/auth/login";

// crud beritaAcara

type Props = {
  page?: number;
  limit?: number;
  search?: string;
  dosen_id?: string;
  tahun?: string | number;
  semester?: string;
};

type Store = {
  dtBeritaAcara: any;
  showBeritaAcara: any;
  setBeritaAcara: ({ page, limit, search, dosen_id }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setShowBeritaAcara: (id: string | number) => Promise<{
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

const useBeritaAcara = create(
  devtools<Store>((set, get) => ({
    setFormData: (row: any) => {
      const formData = new FormData();
      formData.append("berita_acara_id", row.berita_acara_id);
      formData.append("file", row.file);
      return formData;
    },
    dtBeritaAcara: [],
    showBeritaAcara: [],
    setBeritaAcara: async ({
      page = 1,
      limit = 10,
      search,
      dosen_id,
      tahun,
      semester,
    }) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/upload/berita-acara`,
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit,
            page,
            search,
            dosen_id,
            tahun,
            semester,
          },
        });
        set((state) => ({ ...state, dtBeritaAcara: response.data.data }));
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
    setShowBeritaAcara: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/upload/berita-acara/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log({ response });
        set((state) => ({ ...state, showBeritaAcara: response.data.data }));
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
      const formData = row?.file ? get().setFormData(row) : row;
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "post",
          url: `/upload/berita-acara`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        set((prevState: any) => ({
          dtBeritaAcara: {
            last_page: prevState.dtBeritaAcara.last_page,
            current_page: prevState.dtBeritaAcara.current_page,
            data: [res.data.data, ...prevState.dtBeritaAcara.data],
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
          url: `/upload/berita-acara/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((prevState: any) => ({
          dtBeritaAcara: {
            last_page: prevState.dtBeritaAcara.last_page,
            current_page: prevState.dtBeritaAcara.current_page,
            data: prevState.dtBeritaAcara.data.filter(
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
      delete row.id;
      const formData = row?.file ? get().setFormData(row) : row;
      const token = await useLogin.getState().setToken();
      const headersImg = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await crud({
          url: `/upload/berita-acara/${id}`,
          method: "post",
          headers: row?.file
            ? headersImg
            : {
                Authorization: `Bearer ${token}`,
              },
          data: formData,
          params: {
            _method: "PUT",
          },
        });
        set((prevState: any) => ({
          dtBeritaAcara: {
            last_page: prevState.dtBeritaAcara.last_page,
            current_page: prevState.dtBeritaAcara.current_page,
            data: prevState.dtBeritaAcara.data.map((item: any) => {
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

export default useBeritaAcara;
