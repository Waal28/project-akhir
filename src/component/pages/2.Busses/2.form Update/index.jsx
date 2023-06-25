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
import { Close, Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlertOpen,
  setAlertStatus,
  setAlertText,
} from "../../../0.Store/comp";
import { setDataById } from "../../../0.Store/busses";
import { CRUD_busses } from "../../../crud/busses";

const defaultTheme = createTheme();

export default function FormUpdate({ open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { updateData_Busses } = CRUD_busses();
  const { dataById } = useSelector((state) => state.busses);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    updateData_Busses(dataById.id, dataById);
    setOpen(false);
    dispatch(setAlertOpen(true));
    dispatch(setAlertStatus(true));
    dispatch(setAlertText("Data berhasil diupdate"));
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
              Edit data bus
            </Typography>
            <Grid container sx={{ mt: 2 }} spacing={2}>
              <Grid item={true} sm={12} lg={12}>
                <TextField
                  id="filled-basic"
                  label="Kode Bus (auto)"
                  variant="filled"
                  value={dataById.kode}
                  readOnly
                  fullWidth
                  required
                />
              </Grid>
              <Grid item={true} sm={12} lg={12}>
                <TextField
                  id="filled-basic"
                  label="Nama Bus"
                  variant="filled"
                  value={dataById.nama}
                  onChange={(e) =>
                    dispatch(setDataById({ ...dataById, nama: e.target.value }))
                  }
                  fullWidth
                  required
                />
              </Grid>
              <Grid item={true} sm={12} lg={12}>
                <TextField
                  id="filled-basic"
                  label="No Plat"
                  variant="filled"
                  value={dataById.plat}
                  onChange={(e) =>
                    dispatch(setDataById({ ...dataById, plat: e.target.value }))
                  }
                  fullWidth
                  requireds
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
