/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "@/stores/auth/login";

// crud detBeritaAcara

type Props = {
  page?: number;
  limit?: number;
  search?: string;
  berita_acara_id?: string;
};

type Store = {
  dtDetBeritaAcara: any;
  showDetBeritaAcara: any;
  setDetBeritaAcara: ({
    page,
    limit,
    search,
    berita_acara_id,
  }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setShowDetBeritaAcara: (id: string | number) => Promise<{
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

const useDetBeritaAcara = create(
  devtools<Store>((set, get) => ({
    setFormData: (row: any) => {
      const formData = new FormData();
      formData.append("berita_acara_id", row.berita_acara_id);
      formData.append("tgl", row.tgl);
      formData.append("materi", row.materi);
      formData.append("jmlh_mhs", row.jmlh_mhs);
      formData.append("sistem", row.sistem);
      formData.append("foto", row.foto);
      return formData;
    },
    dtDetBeritaAcara: [],
    showDetBeritaAcara: [],
    setDetBeritaAcara: async ({
      page = 1,
      limit = 10,
      search,
      berita_acara_id,
    }) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/det-berita-acara`,
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit,
            page,
            search,
            berita_acara_id,
          },
        });
        set((state) => ({ ...state, dtDetBeritaAcara: response.data.data }));
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
    setShowDetBeritaAcara: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/det-berita-acara/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((state) => ({ ...state, showDetBeritaAcara: response.data.data }));
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
          url: `/det-berita-acara`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        set((prevState: any) => ({
          dtDetBeritaAcara: {
            last_page: prevState.dtDetBeritaAcara.last_page,
            current_page: prevState.dtDetBeritaAcara.current_page,
            data: [res.data.data, ...prevState.dtDetBeritaAcara.data],
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
          url: `/det-berita-acara/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((prevState: any) => ({
          dtDetBeritaAcara: {
            last_page: prevState.dtDetBeritaAcara.last_page,
            current_page: prevState.dtDetBeritaAcara.current_page,
            data: prevState.dtDetBeritaAcara.data.filter(
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
      const formData = row?.foto ? get().setFormData(row) : row;
      const token = await useLogin.getState().setToken();
      const headersImg = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await crud({
          url: `/det-berita-acara/${id}`,
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
        set((prevState: any) => ({
          dtDetBeritaAcara: {
            last_page: prevState.dtDetBeritaAcara.last_page,
            current_page: prevState.dtDetBeritaAcara.current_page,
            data: prevState.dtDetBeritaAcara.data.map((item: any) => {
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

export default useDetBeritaAcara;
