/** @format */
"use client";

import { BASE_URL } from "@/services/baseURL";
import Image from "next/image";
import React, { FC, useState } from "react";
import Resizer from "react-image-file-resizer";

type Props = {
  label?: string;
  register: any;
  required?: boolean;
  name: string;
  errors?: any;
  accept?: any;
  addClass?: string;
  setValue: any;
  fileEdit?: any;
  myFile: any;
  setMyFile: any;
};

const InputFile: FC<Props> = ({
  label,
  register,
  required,
  name,
  errors,
  addClass,
  accept,
  setValue,
  fileEdit,
  myFile,
  setMyFile,
}) => {
  const [typeFile, setTypeFile] = useState<string>();
  const resizeFile = (file: any) =>
    new Promise(() => {
      if (file) {
        const splitType = file?.type?.split("/") || [];
        const type = splitType[0];
        if (type !== "image") {
          return onSelectFile(file);
        }
        console.log({ splitType });
        Resizer.imageFileResizer(
          file,
          1500,
          1500,
          splitType[1],
          80,
          0,
          (uri) => {
            onSelectFile(uri);
          },
          "file"
        );
      } else {
        onSelectFile(null);
      }
    });
  const onSelectFile = (file: any) => {
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setMyFile(reader.result);
      };
    }
    const splitType = file?.type?.split("/") || [];
    setTypeFile(splitType[0]);
    setValue(name, file);
  };
  return (
    <div className={addClass}>
      <label className="text-sm font-medium text-gray-700 tracking-wide">
        {label}
      </label>
      {required && <span className="ml-1 text-red-600">*</span>}
      <input
        className="w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
        id="fileInput"
        type="file"
        accept={accept}
        onChange={(event: any) => {
          const selectedFile = event.target?.files[0] || null;
          resizeFile(selectedFile);
        }}
      />
      <input
        type="hidden"
        id={label}
        {...register(name, {
          required,
        })}
      />
      {/* review file */}
      <div className="flex gap-4 mt-2">
        {/* jika myFile type image */}
        {myFile && typeFile === "image" && (
          <Image
            className="rounded-lg"
            src={myFile}
            width={100}
            height={100}
            alt=""
          />
        )}
        {/* jika fileEdit ada */}
        {fileEdit && name !== "file" && (
          <div>
            <Image
              src={`${BASE_URL}/${fileEdit}`}
              width={100}
              height={100}
              alt=""
            />
          </div>
        )}
      </div>
      {/* jika type password */}
      {errors?.type === "required" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh kosong
        </p>
      )}
    </div>
  );
};

export default InputFile;
