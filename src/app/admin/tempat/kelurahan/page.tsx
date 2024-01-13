/** @format */
"use client";
import React, { useState } from "react";

import ShowData from "./ShowData";
import Form from "./form/Form";
import ModalDelete from "@/components/modal/ModalDelete";
import useKelurahan from "@/stores/crud/Kelurahan";
import { Toaster } from "react-hot-toast";
import toastShow from "@/utils/toast-show";
import InputTextSearch from "@/components/input/InputTextSerch";
import ButtonSecondary from "@/components/button/ButtonSecondary";

// type setDelete
type Delete = {
  id?: number | string;
  isDelete: boolean;
};

const Kelurahan = () => {
  // store
  const { removeData } = useKelurahan();
  // state
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [idDel, setIdDel] = useState<number | string>();
  const [dtEdit, setDtEdit] = useState<any>();
  const [search, setSearch] = useState("");

  const handleTambah = () => {
    setShowModal(true);
    setDtEdit(null);
  };

  const setEdit = (row: any) => {
    setShowModal(true);
    setDtEdit(row);
  };

  const setDelete = async ({ id, isDelete }: Delete) => {
    setIdDel(id);
    if (isDelete) {
      const { data } = await removeData(idDel);
      toastShow({
        event: data,
      });
      setShowDelete(false);
    } else setShowDelete(true);
  };

  return (
    <div className="flex flex-col h-full">
      <div>
        <Toaster />
        <Form
          dtEdit={dtEdit}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <ModalDelete
          showDel={showDelete}
          setShowDel={setShowDelete}
          setDelete={setDelete}
        />
        <div className="mb-4 flex justify-between">
          <p>Silahkan Mengolah data Kelurahan</p>
          <div>
            <ButtonSecondary text="Tambah Kelurahan" onClick={handleTambah} />
          </div>
        </div>
        <InputTextSearch
          placeholder="Cari Kelurahan"
          onChange={(e) => setSearch(e)}
        />
      </div>

      <ShowData setDelete={setDelete} setEdit={setEdit} search={search} />
    </div>
  );
};

export default Kelurahan;
