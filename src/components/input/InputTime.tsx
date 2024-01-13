/** @format */

import React, { FC } from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";

type Props = {
  control: any;
  required?: boolean;
  name: string;
  errors?: any;
  addClass?: any;
  label: string;
  startTime: any;
  setStartTime: any;
};

const InputTime: FC<Props> = ({
  control,
  required,
  name,
  errors,
  addClass,
  label,
  startTime,
  setStartTime,
}) => {
  return (
    <div className={addClass}>
      <label className="text-sm font-medium text-gray-700 tracking-wide block">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <DatePicker
            selected={startTime}
            onChange={(date) => {
              if (date) {
                setStartTime(date);
                const mtDate = moment(date).format("HH:mm");
                field.onChange(mtDate);
              } else {
                setStartTime(null); // or set to an empty value that works for your use case
                field.onChange(""); // Set the value in react-hook-form
              }
            }}
            value={startTime || ""}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Jam"
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            // className="timepick-datepicker"
            className="w-full border rounded-lg py-2 px-4"
          />
        )}
      />
      {errors?.type === "required" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh kosong
        </p>
      )}
    </div>
  );
};

export default InputTime;
