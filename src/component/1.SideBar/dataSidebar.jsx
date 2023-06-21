import {
  AirlineSeatReclineExtra,
  DashboardCustomizeSharp,
  DirectionsBus,
  EventNote,
  ForkLeft,
  Group,
} from "@mui/icons-material";

export const dataAdmin = [
  {
    page: "Dashboard",
    path: "/",
    icon: <DashboardCustomizeSharp sx={{ color: "white" }} />,
  },
  {
    page: "Busess",
    path: "/busess",
    icon: <DirectionsBus sx={{ color: "white" }} />,
  },
  {
    page: "Routes",
    path: "/routes",
    icon: <ForkLeft sx={{ color: "white" }} />,
  },
  {
    page: "Customers",
    path: "/customers",
    icon: <Group sx={{ color: "white" }} />,
  },
  {
    page: "Bokings",
    path: "/bokings",
    icon: <EventNote sx={{ color: "white" }} />,
  },
  {
    page: "Seats",
    path: "/seats",
    icon: <AirlineSeatReclineExtra sx={{ color: "white" }} />,
  },
];
export const dataUser = [
  {
    page: "Bokings",
    path: "/bokings",
    icon: <EventNote sx={{ color: "white" }} />,
  },
  {
    page: "Seats",
    path: "/seats",
    icon: <AirlineSeatReclineExtra sx={{ color: "white" }} />,
  },
];
