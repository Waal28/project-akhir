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
import { CRUD_Routes } from "../../crud/routes";
import { CRUD_busses } from "../../crud/busses";
import FormAdd from "./1.formAdd/index.jsx";
import FormUpdate from "./2.form Update/index.jsx";
import DataRoutes from "./dataRoutes";

const RoutesComp = () => {
  const [credential] = useLocalStorage("credential");
  const [usernameStorage] = useLocalStorage("username");
  const [clickAdd, setClickAdd] = useState(false);
  const { fetchData_Routes, deleteData_Routes } = CRUD_Routes();
  const { fetchData_Busses } = CRUD_busses();
  const { id } = useSelector((state) => state.busses);
  const {
    columns,
    rows,
    clickDelete,
    setClickDelete,
    clickUpdate,
    setClickUpdate,
    text,
  } = DataRoutes();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleYesClickDelete = () => {
    deleteData_Routes(id);
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
    fetchData_Routes();
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
        Rute
      </Typography>
      <Grid container sx={{ mb: 2, ml: 2 }}>
        <Grid
          item={true}
          sm={2}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Button startIcon={<Add />} onClick={() => setClickAdd(true)}>
            Tambah Rute
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

export default RoutesComp;
