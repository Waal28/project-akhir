import React, { useState } from "react";
import { Delete, ModeEdit } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../../0.Store/routes";
import { CRUD_Routes } from "../../crud/routes";

const DataRoutes = () => {
  const { fetchDataById_Routes } = CRUD_Routes();
  const [clickDelete, setClickDelete] = useState(false);
  const [clickUpdate, setClickUpdate] = useState(false);
  const [text, setText] = useState("");
  const { dataRoutes } = useSelector((state) => state.routes);
  const dispatch = useDispatch();

  const handleClickUpdate = (id) => {
    fetchDataById_Routes(id);
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

  function createData(no, idRoute, jalur, bus, tanggal, jam, harga, aksi) {
    return { no, idRoute, jalur, bus, tanggal, jam, harga, aksi };
  }

  const columns = [
    {
      id: "no",
      label: "No",
      minWidth: 30,
    },
    {
      id: "idRoute",
      label: "Id",
      minWidth: 100,
      align: "center",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "jalur",
      label: "Lewat Kota",
      minWidth: 100,
      align: "left",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "bus",
      label: "Bus",
      minWidth: 100,
      align: "center",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "tanggal",
      label: "Tanggal Keberangkatan",
      minWidth: 100,
      align: "center",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "jam",
      label: "Jam Keberangkatan",
      minWidth: 100,
      align: "center",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "harga",
      label: "Harga",
      minWidth: 100,
      align: "left",
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
  const rows = dataRoutes.map((d, index) => {
    let tanggal = new Date(d.tanggal);
    let jam = new Date(d.jam);

    let tanggalRoutes =
      tanggal.getFullYear() +
      "-" +
      (tanggal.getMonth() + 1) +
      "-" +
      tanggal.getDate();

    let jamRoutes =
      jam.getHours() + ":" + jam.getMinutes() + ":" + jam.getSeconds();

    return createData(
      index + 1,
      d.idRoute,
      d.jalur,
      d.bus,
      tanggalRoutes,
      jamRoutes,
      `Rp. ${d.harga}`,
      _aksi(d.idRoute, d.id)
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
export default DataRoutes;
