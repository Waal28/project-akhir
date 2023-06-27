import { Add } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAlertOpen,
  setAlertStatus,
  setAlertText,
} from "../../0.Store/comp.js";
import StickyHeadTable from "../../2.Table/stickyTable.jsx";
import PopUp from "../../4.popUp/index.jsx";
import { useLocalStorage } from "../../5.hooks/localStorage";
import { CRUD_Bokings } from "../../crud/bokings";
import { CRUD_busses } from "../../crud/busses";
import { CRUD_Routes } from "../../crud/routes";
import { CRUD_Customers } from "../../crud/customers";
// import { CRUD_Seats } from "../../crud/seats";
import FormAdd from "./1.formAdd/index.jsx";
import FormUpdate from "./2.form Update/index.jsx";
import DataCustomers from "./dataBokings";

const Bokings = () => {
  const [credential] = useLocalStorage("credential");
  const [usernameStorage] = useLocalStorage("username");
  const [clickAdd, setClickAdd] = useState(false);
  const { fetchData_Bokings, deleteData_Bokings } = CRUD_Bokings();
  const { fetchData_Busses, updateData_Busses } = CRUD_busses();
  const { fetchData_Routes } = CRUD_Routes();
  const { fetchData_Customers } = CRUD_Customers();
  // const { fetchData_Seats } = CRUD_Seats();

  const { dataBusses } = useSelector((state) => state.busses);
  const { id, dataById } = useSelector((state) => state.bokings);
  const newData = dataBusses.find((data) => data.kode === dataById.bus);
  const {
    columns,
    rows,
    clickDelete,
    setClickDelete,
    clickUpdate,
    setClickUpdate,
    text,
  } = DataCustomers();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleYesClickDelete = () => {
    const dataBusUpdate = newData.seats.map((data) => {
      if (data.label === dataById.seats) {
        return { ...data, status: false };
      }
      return data;
    });
    console.log(dataBusUpdate);
    console.log(dataById);
    updateData_Busses(newData.id, { ...newData, seats: dataBusUpdate });
    deleteData_Bokings(id);
    setClickDelete(false);
    dispatch(setAlertOpen(true));
    dispatch(setAlertStatus(true));
    dispatch(setAlertText("Data berhasil dihapus"));
  };
  useEffect(() => {
    if (credential || usernameStorage) {
    } else {
      navigate("/login");
    }
  }, [credential, usernameStorage, navigate]);
  useEffect(() => {
    fetchData_Bokings();
    fetchData_Busses();
    fetchData_Routes();
    fetchData_Customers();
    // fetchData_Seats()
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
        Boking
      </Typography>
      <Grid container sx={{ mb: 2, ml: 2 }}>
        <Grid
          item={true}
          sm={3}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Button startIcon={<Add />} onClick={() => setClickAdd(true)}>
            Tambah Boking
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item={true} xs={12} sm={12} md={12} lg={12} sx={{ mx: "auto" }}>
          <StickyHeadTable columns={columns} rows={rows} />
        </Grid>
      </Grid>
      <FormAdd open={clickAdd} setOpen={setClickAdd} />
      <FormUpdate open={clickUpdate} setOpen={setClickUpdate} />
      <PopUp
        open={clickDelete}
        setOpen={setClickDelete}
        text={text}
        yesAction={"Hapus"}
        handleClick={handleYesClickDelete}
      />
    </Grid>
  );
};

export default Bokings;
