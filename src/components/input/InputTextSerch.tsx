/** @format */
"use client";

import React, { ChangeEvent, FC } from "react";

type Props = {
  placeholder?: string;
  addClass?: string;
  onChange: (e: string) => void;
  defaultValue?: string;
};

const InputTextSearch: FC<Props> = ({
  placeholder,
  addClass,
  onChange,
  defaultValue = "",
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // Teruskan nilai input ke fungsi onChange yang diberikan sebagai prop
  };
  return (
    <div className={addClass}>
      <input
        className="w-full text-gray-700 px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
        placeholder={placeholder}
        onChange={handleInputChange}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default InputTextSearch;
