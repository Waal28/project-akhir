import * as React from "react";
import Alert from "@mui/material/Alert";
import { Slide, Grid, IconButton, AlertTitle } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useLocalStorage } from "../5.hooks/localStorage";
import { useSelector } from "react-redux";

export default function AlertLogin() {
  const [loginAlert] = useLocalStorage("loginAlert");
  const { alertStatus, alertText } = useSelector((state) => state.comp);
  const [open, setOpen] = React.useState(loginAlert);

  const handleClose = () => {
    localStorage.removeItem("loginAlert");
    setOpen(false);
  };

  React.useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("loginAlert");
      setOpen(false);
    }, 6000);
  }, [open]);

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit timeout={700}>
      <Grid
        container
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
        }}
      >
        <Grid item={true} xs={8} md={6} lg={4} sx={{ my: 1, mx: "auto" }}>
          <Alert
            severity={alertStatus ? "success" : "error"}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleClose}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ boxShadow: 3, textAlign: "left" }}
          >
            <AlertTitle>
              <strong>{alertStatus ? "Success" : "Error"}</strong>
            </AlertTitle>
            {alertText}
          </Alert>
        </Grid>
      </Grid>
    </Slide>
  );
}
