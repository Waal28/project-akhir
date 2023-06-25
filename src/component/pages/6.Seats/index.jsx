import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../5.hooks/localStorage";

const Seats = () => {
  const [credential] = useLocalStorage("credential");
  const [usernameStorage] = useLocalStorage("username");

  const navigate = useNavigate();

  useEffect(() => {
    if (credential || usernameStorage) {
    } else {
      navigate("/login");
    }
  }, [credential, usernameStorage, navigate]);

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
        Seats
      </Typography>
      <Grid container spacing={3}></Grid>
    </Grid>
  );
};

export default Seats;
