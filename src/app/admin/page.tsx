/** @format */
"use client";
import AnimatedNumber from "@/components/animated/AnimatedNumber";
import useDosenApi from "@/stores/api/Dosen";
import useMatkulApi from "@/stores/api/Matkul";
import useRuanganApi from "@/stores/api/Ruangan";
import { config } from "@react-spring/web";
import React, { useEffect } from "react";
import {
  BsFillBookFill,
  BsFillPersonLinesFill,
  BsLampFill,
} from "react-icons/bs";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <div className="mb-4">
        <p className="text-lg text-center tracking-[0.2rem]">SILAKU</p>
        <p className="text-center text-sm text-font-1">
          (Sistem Informasi Perkuliahan Fakultas Sains & Teknologi)
        </p>
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className="flex flex-col bg-primary/10 p-4 px-8 rounded-md gap-1"></div>
        <div className="flex flex-col bg-warning/10 p-4 px-8 rounded-md gap-1"></div>
      </div>
    </div>
  );
};

export default Home;
