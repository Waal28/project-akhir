import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Dialog,
  Grid,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MuiPhoneNumber from "mui-phone-number";
// import { MuiTelInput } from "mui-tel-input";
import { Close, Save } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  setAlertOpen,
  setAlertStatus,
  setAlertText,
} from "../../../0.Store/comp";
import { CRUD_Customers } from "../../../crud/customers";

const defaultTheme = createTheme();

export default function FormAdd({ open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { createData_Customers } = CRUD_Customers();
  const dispatch = useDispatch();
  const [noHp, setNoHp] = React.useState("");
  const [customers, setCustomers] = React.useState({
    idCustomers: `CS-${Math.floor(Math.random() * 9999) + 1000}`,
    nama: "",
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (/[0-9]/.test(customers.nama)) {
      setOpen(false);
      dispatch(setAlertOpen(true));
      dispatch(setAlertStatus(false));
      dispatch(setAlertText("Nama pelanggan hanya bisa diisi dengan huruf"));
    } else {
      createData_Customers({ ...customers, noHp });
      setOpen(false);
      dispatch(setAlertOpen(true));
      dispatch(setAlertStatus(true));
      dispatch(setAlertText("Pelanggan berhasil ditambah"));
    }
    setNoHp("");
    setCustomers({
      idCustomers: `CS-${Math.floor(Math.random() * 9999) + 1000}`,
      nama: "",
    });
  };

  const handleChangePhone = (newValue) => {
    setNoHp(newValue);
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
              Tambah data pelanggan
            </Typography>
            <form onSubmit={handleSave}>
              <Grid container sx={{ mt: 2 }} spacing={2}>
                <Grid item={true} sm={12} lg={12}>
                  <TextField
                    id="filled-basic"
                    label="Id Pelanggan (auto)"
                    variant="filled"
                    value={customers.idCustomers}
                    readOnly
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item={true} sm={12} lg={12}>
                  <TextField
                    id="filled-basic"
                    label="Nama Pelanggan"
                    variant="filled"
                    value={customers.nama}
                    onChange={(e) =>
                      setCustomers({ ...customers, nama: e.target.value })
                    }
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item={true} sm={12} lg={12} sx={{ mt: 2 }}>
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
