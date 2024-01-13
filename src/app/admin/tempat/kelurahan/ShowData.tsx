/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import useKelurahan from "@/stores/crud/Kelurahan";
import React, { FC, useEffect, useState } from "react";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};

type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: any) => void;
  search: string;
};

const ShowData: FC<Props> = ({ setDelete, setEdit, search }) => {
  const { setKelurahan, dtKelurahan } = useKelurahan();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDataKelurahan = async () => {
    const res = await setKelurahan({
      page,
      limit,
      search,
    });
    setIsLoading(false);
  };
  useEffect(() => {
    fetchDataKelurahan();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);
  // ketika search berubah
  useEffect(() => {
    setPage(1);
    fetchDataKelurahan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // table
  const headTable = ["No", "Nama Kelurahan", "Kecamatan", "Aksi"];
  const tableBodies = ["nama", "kecamatan.nama"];
  return (
    <div className="flex-1 flex-col max-w-full h-full overflow-auto">
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <div className="">
            <TablesDefault
              headTable={headTable}
              tableBodies={tableBodies}
              dataTable={dtKelurahan.data}
              page={page}
              limit={limit}
              setEdit={setEdit}
              setDelete={setDelete}
              ubah={true}
              hapus={true}
            />
          </div>
          {dtKelurahan?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtKelurahan?.current_page}
                totalPages={dtKelurahan?.last_page}
                setPage={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowData;
