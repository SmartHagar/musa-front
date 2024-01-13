/** @format */

import React, { FC } from "react";

type Props = {
  text: string;
  onClick: () => void;
  addClass?: string;
};

const ButtonPrimary: FC<Props> = ({ text, onClick, addClass }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary rounded-lg px-4 py-2 text-white w-fit cursor-pointer hover:shadow-sm hover:shadow-primary ${addClass}`}
    >
      {text}
    </button>
  );
};

export default ButtonPrimary;
