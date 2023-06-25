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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Close, Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlertOpen,
  setAlertStatus,
  setAlertText,
} from "../../../0.Store/comp";
import { CRUD_Routes } from "../../../crud/routes";

const defaultTheme = createTheme();

export default function FormAdd({ open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { dataBusses } = useSelector((state) => state.busses);
  const { createData_Routes } = CRUD_Routes();
  const dispatch = useDispatch();
  const [rute, setRute] = React.useState({
    idRoute: "",
    jalur: "",
    bus: "",
    tanggal: dayjs(new Date()),
    jam: dayjs(new Date()),
    harga: "",
  });
  const busses = dataBusses.map((bus) => bus.kode);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    if (/[0-9]/.test(rute.jalur)) {
      setOpen(false);
      dispatch(setAlertOpen(true));
      dispatch(setAlertStatus(false));
      dispatch(setAlertText("jalur jalur hanya bisa diisi dengan huruf"));
    } else {
      createData_Routes(rute);
      setOpen(false);
      dispatch(setAlertOpen(true));
      dispatch(setAlertStatus(true));
      dispatch(setAlertText("Rute berhasil ditambah"));
    }
    console.log(rute);
    setRute({
      idRoute: "",
      jalur: "",
      bus: "",
      tanggal: dayjs(new Date()),
      jam: dayjs(new Date()),
      harga: "",
    });
  };
  React.useEffect(() => {
    setRute({
      ...rute,
      idRoute: `RT-${Math.floor(Math.random() * 9999) + 1000}`,
    });
  }, [open]);
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
              Tambah data bus
            </Typography>
            <Grid container sx={{ mt: 2 }} spacing={2}>
              <Grid item={true} sm={12} lg={12}>
                <TextField
                  id="filled-basic"
                  label="Id Rute (auto)"
                  variant="filled"
                  value={rute.idRoute}
                  readOnly
                  fullWidth
                />
              </Grid>
              <Grid item={true} sm={12} lg={12}>
                <TextField
                  id="filled-basic"
                  label="Jalur Kota"
                  variant="filled"
                  value={rute.jalur}
                  onChange={(e) => setRute({ ...rute, jalur: e.target.value })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item={true} sm={12} lg={12} sx={{ mt: 1, mb: 1.5 }}>
                <Autocomplete
                  disablePortal
                  value={rute.bus}
                  onChange={(e, newValue) =>
                    setRute({ ...rute, bus: newValue })
                  }
                  options={busses}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Kode Bus" />
                  )}
                />
              </Grid>
              <Grid item={true} sm={6} lg={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Tanggal Keberangkatan"
                    value={rute.tanggal}
                    onChange={(newValue) =>
                      setRute({ ...rute, tanggal: newValue })
                    }
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item={true} sm={6} lg={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Jam Keberangkatan"
                    value={rute.jam}
                    onChange={(newValue) => setRute({ ...rute, jam: newValue })}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item={true} sm={12} lg={12} sx={{ mb: 1 }}>
                <TextField
                  id="filled-basic"
                  label="Harga"
                  type="number"
                  variant="filled"
                  value={rute.harga}
                  onChange={(e) => setRute({ ...rute, harga: e.target.value })}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 5, justifyContent: "end" }}>
              <Button
                onClick={handleSave}
                startIcon={<Save />}
                variant="contained"
              >
                <span>Save</span>
              </Button>
            </Grid>
          </Paper>
        </Container>
      </ThemeProvider>
    </Dialog>
  );
}
