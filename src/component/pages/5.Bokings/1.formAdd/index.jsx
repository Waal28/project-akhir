import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Autocomplete,
  Button,
  Dialog,
  Grid,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MuiPhoneNumber from "mui-phone-number";
import { Close, Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlertOpen,
  setAlertStatus,
  setAlertText,
} from "../../../0.Store/comp";
import { CRUD_Bokings } from "../../../crud/bokings";
import { CRUD_busses } from "../../../crud/busses";

const defaultTheme = createTheme();

export default function FormAdd({ open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { dataBusses } = useSelector((state) => state.busses);
  const { dataRoutes } = useSelector((state) => state.routes);
  const { dataCustomers } = useSelector((state) => state.customers);

  const { createData_Bokings } = CRUD_Bokings();
  const { updateData_Busses } = CRUD_busses();

  const dispatch = useDispatch();
  const [noHp, setNoHp] = React.useState("");
  const [bokings, setBokings] = React.useState({
    kode: `BK-${Math.floor(Math.random() * 9999) + 1000}`,
    pelanggan: "",
    noHp: "",
    bus: "",
    rute: "",
    seats: "",
    harga: "",
    w_keberangkatan: dayjs(new Date()),
    w_pemesanan: dayjs(new Date()),
  });
  const [bus, setBus] = React.useState({
    seats: [],
  });
  const [busSeatsTrue, setBusSeatsTrue] = React.useState([]);

  const busses = dataBusses.map((bus) => bus.kode);
  const routes = dataRoutes.map((routes) => routes.idRoute);
  const customers = dataCustomers.map((cutomers) => cutomers.idCustomers);

  const handleClose = () => {
    setOpen(false);
    setNoHp("");
    setBus({
      seats: [],
    });
    setBokings({
      kode: `BK-${Math.floor(Math.random() * 9999) + 1000}`,
      pelanggan: "",
      noHp: "",
      bus: "",
      rute: "",
      seats: "",
      harga: "",
      w_keberangkatan: dayjs(new Date()),
      w_pemesanan: dayjs(new Date()),
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const checkTrue = bus.seats.find((data) => data.label === bokings.seats);
    const newData = bus.seats.map((data) => {
      if (data.label === bokings.seats) {
        return { ...data, status: true };
      }
      return data;
    });

    if (checkTrue) {
      console.log("berhasil");
      setBus(newData);
      createData_Bokings({ ...bokings, noHp: noHp });
      updateData_Busses(bus.id, { ...bus, seats: newData });
      setOpen(false);
      dispatch(setAlertOpen(true));
      dispatch(setAlertStatus(true));
      dispatch(setAlertText("Data boking berhasil ditambah"));

      setNoHp("");
      setBus({
        seats: [],
      });
      setBokings({
        kode: `BK-${Math.floor(Math.random() * 9999) + 1000}`,
        pelanggan: "",
        noHp: "",
        bus: "",
        rute: "",
        seats: "",
        harga: "",
        w_keberangkatan: dayjs(new Date()),
        w_pemesanan: dayjs(new Date()),
      });
    } else {
      console.log("gagal");
    }
  };

  const handleChangePhone = (newValue) => {
    setNoHp(newValue);
  };
  const handleChangeBus = (e, newValue) => {
    let newData = dataBusses.find((data) => data.kode === newValue);

    if (newValue === null) {
      setBokings({ ...bokings, bus: newValue, seats: "" });
      setBus(newData);
    } else {
      let newData1 = newData.seats.filter((data) => data.status === false);
      setBokings({ ...bokings, bus: newValue });
      setBus(newData);
      setBusSeatsTrue(newData1);
    }
  };
  const handleChangeRute = (e, newValue) => {
    let newData = dataRoutes.find((data) => data.idRoute === newValue);
    if (newValue === null) {
      setBokings({ ...bokings, rute: newValue, harga: "" });
    } else {
      setBokings({ ...bokings, rute: newValue, harga: newData.harga });
    }
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Buszilla
            </Typography>
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
              onClick={() => setOpen(false)}
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h3" variant="h5" align="center">
              Tambah boking
            </Typography>
            <form onSubmit={handleSave}>
              <Grid container sx={{ mt: 2 }} spacing={2}>
                <Grid item={true} sm={12} lg={6} sx={{ mb: 2 }}>
                  <TextField
                    id="filled-basic"
                    label="Kode Boking (auto)"
                    variant="filled"
                    value={bokings.kode}
                    readOnly
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item={true} sm={12} lg={6} sx={{ mb: 2 }}>
                  <Autocomplete
                    disablePortal
                    value={bokings.rute}
                    onChange={(e, newValue) => handleChangeRute(e, newValue)}
                    options={routes}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="Rute" variant="filled" />
                    )}
                  />
                </Grid>
                <Grid item={true} sm={12} lg={12} sx={{ mb: 2 }}>
                  <Autocomplete
                    disablePortal
                    value={bokings.pelanggan}
                    onChange={(e, newValue) =>
                      setBokings({ ...bokings, pelanggan: newValue })
                    }
                    options={customers}
                    fullWidth
                    required
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Pelanggan"
                        variant="filled"
                      />
                    )}
                  />
                </Grid>
                <Grid item={true} sm={12} lg={6} sx={{ mb: 2 }}>
                  <MuiPhoneNumber
                    defaultCountry={"id"}
                    label="No Telepon"
                    variant="filled"
                    value={noHp}
                    onChange={handleChangePhone}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item={true} sm={12} lg={6} sx={{ mb: 2 }}>
                  <TextField
                    id="filled-basic"
                    label="Harga"
                    variant="filled"
                    type="number"
                    value={bokings.harga}
                    readOnly
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item={true} sm={12} lg={6} sx={{ mb: 2 }}>
                  <Autocomplete
                    disablePortal
                    value={bokings.bus}
                    onChange={(e, newValue) => handleChangeBus(e, newValue)}
                    options={busses}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="Bus" variant="filled" />
                    )}
                  />
                </Grid>
                <Grid item={true} sm={12} lg={6} sx={{ mb: 2.5 }}>
                  <Autocomplete
                    disablePortal
                    value={bokings.seats}
                    onChange={(e, newValue) =>
                      setBokings({
                        ...bokings,
                        seats: newValue === null ? "" : newValue.label,
                      })
                    }
                    options={busSeatsTrue}
                    disabled={bokings.bus === null || bokings.bus === ""}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="Kursi" variant="filled" />
                    )}
                  />
                </Grid>
                <Grid item={true} sm={12} lg={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      variant="filled"
                      label="Waktu Keberangkatan"
                      value={bokings.w_keberangkatan}
                      onChange={(newValue) =>
                        setBokings({ ...bokings, w_keberangkatan: newValue })
                      }
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 5, justifyContent: "end" }}>
                <Button type="submit" startIcon={<Save />} variant="contained">
                  <span>Save</span>
                </Button>
              </Grid>
            </form>
          </Paper>
        </Container>
      </ThemeProvider>
    </Dialog>
  );
}
