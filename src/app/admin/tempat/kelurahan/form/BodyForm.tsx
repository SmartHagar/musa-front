/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import SelectFromDb from "@/components/select/SelectFromDB";
import useKecamatanApi from "@/stores/api/Kecamatan";
import React, { FC, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  register: any;
  errors: any;
  dtEdit: any;
  control: any;
  watch: any;
  setValue: any;
  showModal: boolean;
};

const BodyForm: FC<Props> = ({
  register,
  errors,
  control,
  dtEdit,
  watch,
  setValue,
  showModal,
}) => {
  const { setKecamatanAll, dtKecamatan } = useKecamatanApi();
  // / memanggil store api
  const fetchDataSelect = async ({ search }: any) => {
    await setKecamatanAll({
      search,
    });
  };
  useEffect(() => {
    fetchDataSelect({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);
  return (
    <>
      <InputTextDefault
        label="Nama Kelurahan"
        name="nama"
        register={register}
        required
        minLength={2}
        errors={errors.nama}
        addClass="col-span-4"
      />
      {dtKecamatan?.data && (
        <SelectFromDb
          label="Kecamatan"
          placeholder="Pilih Kecamatan"
          name="kecamatan_id"
          dataDb={dtKecamatan?.data}
          body={["id", "nama"]}
          control={control}
          required
          errors={errors.kecamatan_id}
          addClass="col-span-4"
        />
      )}
    </>
  );
};

export default BodyForm;
