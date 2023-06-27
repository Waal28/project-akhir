import React, { useState } from "react";
import { Delete, ModeEdit } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../../0.Store/busses";
import { CRUD_busses } from "../../crud/busses";

const DataBusses = () => {
  const { fetchDataById_Busses } = CRUD_busses();
  const [clickDelete, setClickDelete] = useState(false);
  const [clickUpdate, setClickUpdate] = useState(false);
  const [text, setText] = useState("");
  const { dataBusses } = useSelector((state) => state.busses);
  const dispatch = useDispatch();

  const handleClickUpdate = (id) => {
    fetchDataById_Busses(id);
    setClickUpdate(true);
  };
  const handleClickDelete = (code, id) => {
    dispatch(setId(id));
    setClickDelete(true);
    setText(`Hapus data ${code} ?`);
  };

  const _aksi = (code, id) => {
    return (
      <Grid>
        <IconButton onClick={() => handleClickUpdate(id)}>
          <ModeEdit sx={{ color: "#424242" }} />
        </IconButton>
        <IconButton onClick={() => handleClickDelete(code, id)}>
          <Delete sx={{ color: "#424242" }} />
        </IconButton>
      </Grid>
    );
  };

  function createData(no, code, busName, plat, kursi, tglInput, aksi) {
    return { no, code, busName, plat, kursi, tglInput, aksi };
  }

  const columns = [
    {
      id: "no",
      label: "No",
      minWidth: 30,
    },
    { id: "code", label: "Kode Bus", minWidth: 90 },
    {
      id: "busName",
      label: "Nama Bus",
      minWidth: 100,
      align: "left",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "plat",
      label: "No Plat",
      minWidth: 100,
      align: "center",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "kursi",
      label: "Kursi Tersedia",
      minWidth: 100,
      align: "center",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "tglInput",
      label: "Waktu Input",
      minWidth: 100,
      align: "center",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "aksi",
      label: "Aksi",
      minWidth: 100,
      align: "center",
      // format: (value) => value.toLocaleString("en-US"),
    },
  ];
  const rows = dataBusses.map((d, index) => {
    let kursiFalse = d.seats.filter((data) => data.status === false);
    return createData(
      index + 1,
      d.kode,
      d.nama,
      d.plat,
      kursiFalse.length,
      d.tgl_input,
      _aksi(d.kode, d.id)
    );
  });
  return {
    columns,
    rows,
    clickDelete,
    setClickDelete,
    clickUpdate,
    setClickUpdate,
    text,
    _aksi,
  };
};
export default DataBusses;
