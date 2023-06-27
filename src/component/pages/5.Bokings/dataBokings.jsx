import React, { useState } from "react";
import { Delete, ModeEdit } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../../0.Store/bokings";
import { CRUD_Bokings } from "../../crud/bokings";

const DataBokings = () => {
  const { fetchDataById_Bokings } = CRUD_Bokings();
  const [clickDelete, setClickDelete] = useState(false);
  const [clickUpdate, setClickUpdate] = useState(false);
  const [text, setText] = useState("");
  const { dataBokings } = useSelector((state) => state.bokings);
  const dispatch = useDispatch();

  const handleClickUpdate = (id) => {
    fetchDataById_Bokings(id);
    setClickUpdate(true);
  };
  const handleClickDelete = (code, id) => {
    dispatch(setId(id));
    fetchDataById_Bokings(id);
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

  function createData(
    no,
    kode,
    pelanggan,
    noHp,
    bus,
    rute,
    kursi,
    harga,
    w_keberangkatan,
    w_pemesanan,
    aksi
  ) {
    return {
      no,
      kode,
      pelanggan,
      noHp,
      bus,
      rute,
      kursi,
      harga,
      w_keberangkatan,
      w_pemesanan,
      aksi,
    };
  }

  const columns = [
    {
      id: "no",
      label: "No",
      minWidth: 30,
    },
    {
      id: "kode",
      label: "Kode Boking",
      minWidth: 100,
      align: "center",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "pelanggan",
      label: "Pelanggan",
      minWidth: 100,
      align: "left",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "noHp",
      label: "No Telepon",
      minWidth: 100,
      align: "left",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "bus",
      label: "Bus",
      minWidth: 100,
      align: "left",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "rute",
      label: "rute",
      minWidth: 100,
      align: "left",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "kursi",
      label: "Kursi",
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
      id: "w_keberangkatan",
      label: "Waktu Keberangkatan",
      minWidth: 100,
      align: "center",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "w_pemesanan",
      label: "Waktu Pemesanan",
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
  const rows = dataBokings.map((d, index) =>
    createData(
      index + 1,
      d.kode,
      d.pelanggan,
      d.noHp,
      d.bus,
      d.rute,
      d.seats,
      d.harga,
      new Date(d.w_keberangkatan).toLocaleString(),
      new Date(d.w_pemesanan).toLocaleString(),
      _aksi(d.kode, d.id)
    )
  );
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
export default DataBokings;
