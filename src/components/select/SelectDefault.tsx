/** @format */

import React, { FC } from "react";

type Props = {
  label?: string;
  register: any;
  required?: boolean;
  name: string;
  errors?: any;
  placeholder?: string;
  defaultOption?: string;
  options?: any[];
  addClass?: string;
};

export const SelectDefault: FC<Props> = ({
  label,
  register,
  required,
  name,
  placeholder,
  defaultOption,
  options = [],
  errors,
  addClass,
}) => {
  return (
    <div className={addClass}>
      <label className="text-sm font-medium text-gray-700 tracking-wide">
        {label}
      </label>
      {required && <span className="ml-1 text-red-600">*</span>}
      <div className="relative">
        <select
          className="w-full rounded-lg py-2 px-2 bg-white border border-gray-300 focus:outline-none focus:border-secondary"
          id={label}
          placeholder={placeholder}
          {...register(name, {
            required,
          })}
        >
          <option value="">{defaultOption}</option>
          {options.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
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
