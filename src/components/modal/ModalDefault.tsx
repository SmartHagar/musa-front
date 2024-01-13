/** @format */

import React, { FC } from "react";
import { BsXLg } from "react-icons/bs";

type Props = {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  title: string;
  width?: string;
};

const ModalDefault: FC<Props> = ({
  showModal,
  setShowModal,
  children,
  title,
  width = "",
}) => {
  return (
    <div className="">
      {showModal && (
        <div className="fixed inset-0 z-50 mx-auto flex justify-center bg-black/[0.2]">
          <div
            className="bg-white p-5 rounded-xl w-[500px] h-min mt-[10%] max-h-[70%] overflow-hidden flex flex-col lg:w-[700px]"
            style={{ width: width }}
          >
            {/* header */}
            <div className="flex flex-row items-center justify-between border-b border-primary/[0.2] mb-4 pb-2">
              <h5 className="text-xl font-roboto">{title}</h5>
              <BsXLg
                className="cursor-pointer hover:text-primary"
                onClick={() => setShowModal(false)}
              />
            </div>
            {/* body */}
            <div className="overflow-auto">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalDefault;
