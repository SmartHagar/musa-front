/** @format */

import { BASE_URL } from "@/services/baseURL";
import Image from "next/image";
import React, { FC } from "react";

type Props = {
  item: any;
  dtProdi?: any;
};

const CardProfile: FC<Props> = ({ item, dtProdi }) => {
  return (
    <div className="w-full mx-auto bg-black/20 rounded-lg p-5 hover:shadow-md hover:scale-105">
      {/* <img className="w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture"> */}
      <div className="relative w-32 h-32 mx-auto">
        <Image
          src={`${BASE_URL}/${item.foto}`}
          className="rounded-full"
          alt="Profile picture"
          fill
        />
      </div>
      <h2 className="text-center text-2xl font-semibold mt-3">{item.nama}</h2>
      <p className="text-center text-gray-100 mt-1">{item.jenkel}</p>
      <p className="text-center text-gray-100 mt-1">
        {dtProdi?.find((x: any) => x.id === parseInt(item.prodi_id))?.nama}
      </p>
      <div className="flex justify-center mt-5">
        <span className="text-blue-500 hover:text-blue-700 mx-3">
          {item.thn_masuk}
        </span>
        <span className="text-blue-500 hover:text-blue-700 mx-3">-</span>
        <span className="text-blue-500 hover:text-blue-700 mx-3">
          {item.thn_lulus}
        </span>
      </div>
      <div className="mt-5">
        <div className="text-gray-100 flex flex-col gap-2 mt-2">
          <p>Email : {item.email}</p>
          <p>
            Alamat Sekarang : {item.alamat_lengkap} {item.kecamatan.nama},{" "}
            {item.kecamatan.kabupaten.nama}-
            {item.kecamatan.kabupaten.provinsi.nama}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
