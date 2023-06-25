import React, { useEffect, useState } from "react";
import { dataAdmin } from "./dataSidebar";
import {
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography,
  useTheme,
  Drawer,
  IconButton,
  AppBar,
  Avatar,
  Grid,
} from "@mui/material";

import {
  ChevronRight,
  Menu,
  AirlineSeatReclineExtra,
  DashboardCustomizeSharp,
  DirectionsBus,
  EventNote,
  ForkLeft,
  Group,
  Logout,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import { cyan } from "@mui/material/colors";
import logo from "./logo1.png";
import { useLocalStorage } from "../5.hooks/localStorage";
import { decodeToken } from "react-jwt";
import { setUser } from "../0.Store/comp";
import AlertLogin from "../6.alertLogin";
import LogOutComp from "../pages/8.logout";
import AlertComp from "../7.alertComp";

const _white = cyan[50];
const colorSelected = cyan[900];
const drawerWidth = 240;
const iconPage = [
  <DashboardCustomizeSharp sx={{ color: _white }} />,
  <DirectionsBus sx={{ color: _white }} />,
  <ForkLeft sx={{ color: _white }} />,
  <Group sx={{ color: _white }} />,
  <EventNote sx={{ color: _white }} />,
  <AirlineSeatReclineExtra sx={{ color: _white }} />,
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBarComp = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerComp = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideBar = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //
  const { color1, color3, user } = useSelector((state) => state.comp);
  const dispatch = useDispatch();
  const [openPopUp, setOpenPopUp] = useState(false);
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState(location.pathname);

  const handleListItemClick = (event, index) => {
    setSelectedPath(index);
  };
  // cek login
  const [credential] = useLocalStorage("credential");
  const [usernameStorage] = useLocalStorage("username");
  const datas = dataAdmin;
  const navigate = useNavigate();

  useEffect(() => {
    if (credential || usernameStorage) {
    } else {
      navigate("/login");
    }
  }, [credential, usernameStorage, navigate]);

  useEffect(() => {
    const userInfo = !credential
      ? {
          name: "Iwal Faizul",
          picture:
            "https://i.kym-cdn.com/entries/icons/original/000/038/638/the_wock.jpg",
        }
      : decodeToken(credential);
    dispatch(setUser(userInfo));
  }, [dispatch, credential]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarComp
        position="fixed"
        open={open}
        style={{ backgroundColor: colorSelected }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <Marquee speed={60}>
            <Typography variant="h6" noWrap component="div">
              Welcome {user.name} (admin)
            </Typography>
          </Marquee>
        </Toolbar>
      </AppBarComp>
      <DrawerComp variant="permanent" open={open}>
        <DrawerHeader sx={{ bgcolor: color1 }}>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid
              item={true}
              sm={6}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar alt={user.name} src={user.picture} sx={{ margin: 1 }} />
              <Typography color={_white}>{user.name}</Typography>
            </Grid>
            <Grid
              item={true}
              sm={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRight sx={{ color: _white }} />
                ) : (
                  <ChevronRight sx={{ color: _white }} />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </DrawerHeader>
        <Divider />
        <Grid
          container
          sx={{
            backgroundColor: color1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            ...(!open && { display: "none" }),
          }}
        >
          <img
            alt="Remy Sharp"
            src={logo}
            style={{
              width: 180,
            }}
          />
          <Typography color={color3} sx={{ margin: 1, fontSize: 12 }}>
            Berjalan Sesuai Keinginanmu
          </Typography>
        </Grid>
        <Divider />
        <List disablePadding sx={{ bgcolor: colorSelected }}>
          {datas.map((data, index) => (
            <Link
              to={data.path}
              key={data.page}
              style={{ textDecoration: "none", color: _white }}
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    bgcolor:
                      selectedPath === data.path ? colorSelected : color1,
                  }}
                  selected={selectedPath === data.path}
                  onClick={(event) => handleListItemClick(event, data.path)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {iconPage[index]}
                  </ListItemIcon>
                  <ListItemText
                    primary={data.page}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List sx={{ bgcolor: color1, height: "100%" }}>
          {["Logout"].map((text, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => setOpenPopUp(true)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Logout sx={{ color: _white }} />
                </ListItemIcon>
                <ListItemText
                  selected
                  primary={text}
                  sx={{ opacity: open ? 1 : 0, color: _white }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DrawerComp>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <AlertLogin />
        <AlertComp />
        <LogOutComp open={openPopUp} setOpen={setOpenPopUp} />
        {children}
      </Box>
    </Box>
  );
};

export default SideBar;
