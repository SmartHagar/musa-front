/** @format */

import toast from "react-hot-toast";

type Event = {
  type: string;
  message: string;
};

type Props = {
  event: any;
  position?: "top-right";
};

const toastShow = ({ event, position }: Props) => {
  switch (event.type) {
    case "success":
      toast.success(event.message, { duration: 4000, position });
      break;
    case "error":
      toast.error(event.message, { duration: 4000, position });
      break;
  }
};

export default toastShow;
