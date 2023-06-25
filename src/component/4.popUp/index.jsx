import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {} from "react-redux";
import {} from "../0.Store/comp";

export default function PopUp({ open, setOpen, text, yesAction, handleClick }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{text}</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Batal
        </Button>
        <Button onClick={handleClick} autoFocus>
          {yesAction}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
