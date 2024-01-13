/** @format */
"use client";

import React, { FC, useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";

type Props = {
  label?: string;
  register: any;
  required?: boolean;
  name: string;
  minLength?: number;
  maxLength?: number;
  errors?: any;
  valueAsNumber?: boolean;
  type?: string;
  readOnly?: boolean;
  placeholder?: string;
  autoComplete?: string;
  addClass?: string;
  value?: string | number;
  labelCss?: "text-font-1" | "text-gray-700";
};

const InputTextDefault: FC<Props> = ({
  label,
  register,
  required,
  name,
  minLength,
  maxLength,
  errors,
  valueAsNumber,
  type = "text",
  readOnly,
  placeholder,
  autoComplete = "on",
  addClass,
  value,
  labelCss = "text-gray-700",
}) => {
  return (
    <div className={addClass}>
      <label htmlFor={name} className={`text-sm tracking-wide ${labelCss}`}>
        {label}
      </label>
      {required && <span className="ml-1 text-red-600">*</span>}
      <div className="relative">
        <input
          className="w-full text-base px-4 py-2 border text-gray border-gray rounded-lg focus:outline-none focus:border-secondary"
          type={type}
          id={name}
          readOnly={readOnly}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(name, {
            required,
            minLength,
            maxLength,
            valueAsNumber,
          })}
          value={value}
        />
      </div>
      {/* jika type password */}
      {errors?.type === "required" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh kosong
        </p>
      )}
      {errors?.type === "minLength" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh kurang dari {minLength} karakter
        </p>
      )}
      {errors?.type === "maxLength" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh lebih dari {maxLength} karakter
        </p>
      )}
      {errors?.type === "pattern" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} hanya boleh angka.
        </p>
      )}
    </div>
  );
};

export default InputTextDefault;
