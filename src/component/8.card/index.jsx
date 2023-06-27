import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { IconButton } from "@mui/joy";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function CardComp({ header, icon, _color, jmlhData, path }) {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        minWidth: 246,
        "&:hover": {
          boxShadow: "md",
        },
        border: `2px solid ${_color}`,
        borderTop: 0,
        borderLeft: 0,
      }}
    >
      <Grid>
        <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
          <Typography color="primary">Total {header}</Typography>
        </Typography>
        <Box sx={{ width: 80, bgcolor: _color, borderRadius: 2 }}>
          <Typography component="div">
            <Box sx={{ fontFamily: "fantasy", fontSize: "h3.fontSize" }}>
              {jmlhData ? jmlhData : 0}
            </Box>
          </Typography>
        </Box>
      </Grid>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
          {header}
        </Typography>

        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        >
          {icon}
        </IconButton>
        <Link to={path}>
          <Chip
            variant="outlined"
            color="primary"
            size="sm"
            sx={{
              cursor: "pointer",
            }}
          >
            {"View more ->"}
          </Chip>
        </Link>
      </CardContent>
    </Card>
  );
}
