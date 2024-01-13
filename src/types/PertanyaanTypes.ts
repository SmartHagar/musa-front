/** @format */

interface PertanyaanTypes {
  id: number | string;
  pertanyaan: string;
  tipe: string;
  status: string;
  pilihan: PilihanTypes[];
}

export default PertanyaanTypes;
