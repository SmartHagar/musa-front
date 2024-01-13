/** @format */
import HeaderAdmin from "@/components/header/HeaderAdmin";
import ContainerSidebar from "@/components/sidebar/ContainerSidebar";
import React, { ReactNode } from "react";
type Props = {
  children: ReactNode;
};

const layout = (props: Props) => {
  return (
    <div>
      <div className="flex min-h-screen h-screen text-black bg-bg">
        <ContainerSidebar />
        <div className="flex h-full w-full overflow-hidden p-1 rounded-lg flex-col">
          <div className="lg:-mx-4 lg:-mt-2 mb-1 bg-accent">
            <HeaderAdmin />
          </div>
          <div className="h-full overflow-hidden p-2 drop-shadow-2xl shadow-black rounded-lg">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
