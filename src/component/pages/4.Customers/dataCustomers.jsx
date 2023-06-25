import React, { useState } from "react";
import { Delete, ModeEdit } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../../0.Store/customers";
import { CRUD_Customers } from "../../crud/customers";

const DataCustomers = () => {
  const { fetchDataById_Customers } = CRUD_Customers();
  const [clickDelete, setClickDelete] = useState(false);
  const [clickUpdate, setClickUpdate] = useState(false);
  const [text, setText] = useState("");
  const { dataCustomers } = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  const handleClickUpdate = (id) => {
    fetchDataById_Customers(id);
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

  function createData(no, idCustomers, nama, noHp, aksi) {
    return { no, idCustomers, nama, noHp, aksi };
  }

  const columns = [
    {
      id: "no",
      label: "No",
      minWidth: 30,
    },
    {
      id: "idCustomers",
      label: "Id Customers",
      minWidth: 100,
      align: "center",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "nama",
      label: "Nama",
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
      id: "aksi",
      label: "Aksi",
      minWidth: 100,
      align: "center",
      // format: (value) => value.toLocaleString("en-US"),
    },
  ];
  const rows = dataCustomers.map((d, index) =>
    createData(
      index + 1,
      d.idCustomers,
      d.nama,
      d.noHp,
      _aksi(d.idCustomers, d.id)
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
export default DataCustomers;
