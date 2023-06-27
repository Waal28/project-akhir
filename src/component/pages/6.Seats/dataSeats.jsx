import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const DataSeats = ({ bus }) => {
  return (
    <>
      <Grid
        item={true}
        sm={12}
        lg={12}
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        {bus.seats.map((seat, index) => {
          if (index < 10) {
            return (
              <BoxSx
                opa={1}
                bgColor={seat.status === true ? "darkGrey" : "darkcyan"}
              >
                {seat.label}
              </BoxSx>
            );
          } else {
            return null;
          }
        })}
      </Grid>
      {/*  */}
      <Grid
        item={true}
        sm={12}
        lg={12}
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        {bus.seats.map((seat, index) => {
          if (index >= 10 && index < 20) {
            return (
              <BoxSx
                opa={1}
                bgColor={seat.status === true ? "primary.dark" : "darkcyan"}
              >
                {seat.label}
              </BoxSx>
            );
          } else {
            return null;
          }
        })}
      </Grid>
      {/*  */}

      <Grid item={true} sm={12} lg={12} sx={{ height: 50 }}></Grid>

      {/*  */}
      <Grid
        item={true}
        sm={12}
        lg={8}
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        {bus.seats.map((seat, index) => {
          if (index >= 20 && index < 27) {
            return (
              <BoxSx
                opa={1}
                bgColor={seat.status === true ? "primary.dark" : "darkcyan"}
              >
                {seat.label}
              </BoxSx>
            );
          } else {
            return null;
          }
        })}
      </Grid>
      <Grid
        item={true}
        sm={12}
        lg={1}
        sx={{ display: "flex", flexWrap: "wrap" }}
      ></Grid>
      <Grid
        item={true}
        sm={12}
        lg={3}
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        {bus.seats.map((seat, index) => {
          if (index > 26 && index < 29) {
            return (
              <BoxSx
                opa={1}
                bgColor={seat.status === true ? "primary.dark" : "darkcyan"}
              >
                {seat.label}
              </BoxSx>
            );
          } else {
            return null;
          }
        })}
      </Grid>
      <Grid
        item={true}
        sm={12}
        lg={8}
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        {bus.seats.map((seat, index) => {
          if (index >= 29 && index < 36) {
            return (
              <BoxSx
                opa={1}
                bgColor={seat.status === true ? "primary.dark" : "darkcyan"}
              >
                {seat.label}
              </BoxSx>
            );
          } else {
            return null;
          }
        })}
      </Grid>
      <Grid
        item={true}
        sm={12}
        lg={1}
        sx={{ display: "flex", flexWrap: "wrap" }}
      ></Grid>
      <Grid
        item={true}
        sm={12}
        lg={3}
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        {bus.seats.map((seat, index) => {
          if (index > 35 && index < 38) {
            return (
              <BoxSx
                opa={1}
                bgColor={seat.status === true ? "primary.dark" : "darkcyan"}
              >
                {seat.label}
              </BoxSx>
            );
          } else {
            return null;
          }
        })}
      </Grid>
    </>
  );
};

export default DataSeats;
function BoxSx({ children, opa, bgColor }) {
  return (
    <Box
      sx={{
        width: 50,
        height: 50,
        backgroundColor: bgColor,
        color: "white",
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        m: 1,
        opacity: opa,
      }}
    >
      {children}
    </Box>
  );
}
