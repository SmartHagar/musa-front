/** @format */

import PertanyaanTypes from "./PertanyaanTypes";

interface PenilianTypes {
  id: number | string;
  pengguna_id: number | string;
  daftar_pertanyaan_id: number | string;
  jawaban: string;
  daftar_pertanyaan?: PertanyaanTypes;
}

export default PenilianTypes;
