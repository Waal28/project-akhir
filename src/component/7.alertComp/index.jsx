import * as React from "react";
import Alert from "@mui/material/Alert";
import { Slide, Grid, IconButton, AlertTitle } from "@mui/material";
import { Close } from "@mui/icons-material";
import {} from "../5.hooks/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { setAlertOpen } from "../0.Store/comp";

export default function AlertComp() {
  const { alertOpen, alertStatus, alertText } = useSelector(
    (state) => state.comp
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setAlertOpen(false));
  };

  React.useEffect(() => {
    if (alertOpen) {
      setTimeout(() => {
        dispatch(setAlertOpen(false));
      }, 6000);
    }
  }, [alertOpen, dispatch]);

  return (
    <Slide
      direction="down"
      in={alertOpen}
      mountOnEnter
      unmountOnExit
      timeout={700}
    >
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
