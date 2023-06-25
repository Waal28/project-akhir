import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  const { color1, color2 } = useSelector((state) => state.comp);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: color1,
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        The page you’re looking for doesn’t exist.
      </Typography>

      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" sx={{ bgcolor: color2 }}>
          Back Home
        </Button>
      </Link>
    </Box>
  );
}
