import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../5.hooks/localStorage";
import { CRUD_busses } from "../../crud/busses";
import DataSeats from "./dataSeats";

const Seats = () => {
  const [credential] = useLocalStorage("credential");
  const [usernameStorage] = useLocalStorage("username");
  const { fetchData_Busses } = CRUD_busses();

  const [bus, setBus] = useState({
    kode: "",
    seats: [],
  });

  const { dataBusses } = useSelector((state) => state.busses);
  const busses = dataBusses.map((bus) => bus.kode);

  const handleChangeBus = (e, newValue) => {
    let newData = dataBusses.find((data) => data.kode === newValue);
    setBus(newData);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (credential || usernameStorage) {
    } else {
      navigate("/login");
    }
  }, [credential, usernameStorage, navigate]);
  useEffect(() => {
    fetchData_Busses();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid container>
      <Typography
        variant="h3"
        component="div"
        sx={{
          borderBottom: "2px solid gray",
          borderRadius: 1,
          mb: 3,
          pb: 1,
          px: 1,
        }}
      >
        Status Kursi
      </Typography>
      <Grid container spacing={3}>
        <Grid item={true} sm={12} lg={4} sx={{ mb: 2 }}>
          <Autocomplete
            disablePortal
            value={bus.kode}
            onChange={(e, newValue) => handleChangeBus(e, newValue)}
            options={busses}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Bus" variant="filled" />
            )}
          />
        </Grid>
        <Grid
          item={true}
          sm={12}
          lg={8}
          sx={{ mb: 2, display: "flex", flexWrap: "wrap" }}
        >
          {bus.kode === null ? "" : <DataSeats bus={bus} />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Seats;
