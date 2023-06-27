import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../5.hooks/localStorage";
import CardComp from "../../8.card";
import { dataAdmin } from "../../1.SideBar/dataSidebar";
import { Grid, Typography } from "@mui/material";
import { CRUD_Routes } from "../../crud/routes";
import { CRUD_busses } from "../../crud/busses";
import { CRUD_Customers } from "../../crud/customers";
import { CRUD_Bokings } from "../../crud/bokings";

const Dashboard = () => {
  const [credential] = useLocalStorage("credential");
  const [usernameStorage] = useLocalStorage("username");
  const { dataBusses } = useSelector((state) => state.busses);
  const { dataRoutes } = useSelector((state) => state.routes);
  const { dataCustomers } = useSelector((state) => state.customers);
  const { dataBokings } = useSelector((state) => state.bokings);

  const { fetchData_Routes } = CRUD_Routes();
  const { fetchData_Busses } = CRUD_busses();
  const { fetchData_Customers } = CRUD_Customers();
  const { fetchData_Bokings } = CRUD_Bokings();

  const jmlhData = [
    dataBusses.length,
    dataRoutes.length,
    dataCustomers.length,
    dataBokings.length,
  ];

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
    fetchData_Customers();
    fetchData_Bokings();
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
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {dataAdmin.slice(1, 5).map((data, index) => (
          <Grid key={index} item={true} xs={8} sm={8} md={5} lg={3}>
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
