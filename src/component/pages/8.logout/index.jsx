import * as React from "react";
import {} from "react-redux";
import {} from "../../0.Store/comp";
import { useNavigate } from "react-router-dom";
import PopUp from "../../4.popUp";

export default function LogOutComp({ open, setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("credential");
    navigate("/login");
  };
  return (
    <PopUp
      open={open}
      setOpen={setOpen}
      text={"Keluar dari aplikasi?"}
      yesAction={"Keluar"}
      handleClick={handleLogout}
    />
  );
}
