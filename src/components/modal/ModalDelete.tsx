/** @format */

import React, { FC } from "react";
import { BsXLg } from "react-icons/bs";

type Props = {
  showDel: boolean;
  setShowDel: (data: boolean) => void;
  setDelete: ({
    id,
    isDelete,
  }: {
    id?: number | string;
    isDelete: boolean;
  }) => void;
};

const ModalDelete: FC<Props> = ({ showDel, setShowDel, setDelete }) => {
  return (
    showDel && (
      <div>
        <div className="fixed inset-0 z-50 mx-auto flex justify-center bg-black/[0.2]">
          <div className="bg-white p-5 rounded-xl lg:ml-64 md:min-w-[500px] h-min mt-[20%] max-h-[70%] overflow-auto">
            {/* header */}
            <div className="flex flex-row items-center justify-between border-b border-primary/[0.1] mb-4 pb-2">
              <h5 className="text-xl font-roboto">Hapus Data</h5>
              <BsXLg
                className="cursor-pointer hover:text-black/[0.5]"
                onClick={() => setShowDel(false)}
              />
            </div>
            {/* body */}
            <div>
              <p>Apaka Anda Yakin Menghapus Data Ini?</p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  className="hover:border hover:border-red-600 bg-red-600 w-20 py-2 rounded-xl text-white "
                  onClick={() => setDelete({ isDelete: true })}
                >
                  Hapus
                </button>
                <button
                  className="w-20 py-2 rounded-xl hover:border-b"
                  onClick={() => setShowDel(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalDelete;
