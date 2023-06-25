import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../5.hooks/localStorage";
import CardComp from "../../8.card";
import { dataAdmin } from "../../1.SideBar/dataSidebar";
import { Grid, Typography } from "@mui/material";
import { CRUD_Routes } from "../../crud/routes";
import { CRUD_busses } from "../../crud/busses";

const Dashboard = () => {
  const [credential] = useLocalStorage("credential");
  const [usernameStorage] = useLocalStorage("username");
  const { dataBusses } = useSelector((state) => state.busses);
  const { dataRoutes } = useSelector((state) => state.routes);

  const { fetchData_Routes } = CRUD_Routes();
  const { fetchData_Busses } = CRUD_busses();

  const jmlhData = [dataBusses.length, dataRoutes.length];
  const navigate = useNavigate();

  useEffect(() => {
    if (credential || usernameStorage) {
    } else {
      navigate("/login");
    }
  }, [credential, usernameStorage, navigate]);
  useEffect(() => {
    fetchData_Routes();
    fetchData_Busses();
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
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {dataAdmin.slice(1).map((data, index) => (
          <Grid key={index} item={true} sm={3} sx={{}}>
            <CardComp
              header={data.page}
              icon={data.icon}
              _color={data.color}
              jmlhData={jmlhData[index]}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
