import {
  AirlineSeatReclineExtra,
  DashboardCustomizeSharp,
  DirectionsBus,
  EventNote,
  ForkLeft,
  Group,
} from "@mui/icons-material";
import Dashboard from "../pages/1.Dashboard";
import Busses from "../pages/2.Busses";
import RoutesComp from "../pages/3.Routes";
import Customers from "../pages/4.Customers";
import Bokings from "../pages/5.Bokings";
import Seats from "../pages/6.Seats";

export const dataAdmin = [
  {
    page: "Dashboard",
    path: "/",
    icon: <DashboardCustomizeSharp />,
    color: "#f44336",
    element: <Dashboard />,
  },
  {
    page: "Busess",
    path: "/busess",
    icon: <DirectionsBus />,
    color: "#9c27b0",
    element: <Busses />,
  },
  {
    page: "Rute",
    path: "/rute",
    icon: <ForkLeft />,
    color: "#3f51b5",
    element: <RoutesComp />,
  },
  {
    page: "Pelanggan",
    path: "/pelanggan",
    icon: <Group />,
    color: "#009688",
    element: <Customers />,
  },
  {
    page: "Boking",
    path: "/boking",
    icon: <EventNote />,
    color: "#cddc39",
    element: <Bokings />,
  },
  {
    page: "Kursi",
    path: "/kursi",
    icon: <AirlineSeatReclineExtra />,
    color: "#8d6e63",
    element: <Seats />,
  },
];
