import { BsHeartPulseFill } from "react-icons/bs";
import { FaLungsVirus } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "home",
    label: "Home",
    icon: <BiSolidDashboard />,
    path: "/",
  },
  {
    key: "heart",
    label: "Heart",
    icon: <BsHeartPulseFill />,
    path: "/heart-predict",
  },
  {
    key: "lung",
    label: "Lung",
    icon: <FaLungsVirus />,
    path: "/lung-predict",
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "logout",
    label: "Logout",
    icon: <FaSignOutAlt />,
    path: "/login",
  },
];
