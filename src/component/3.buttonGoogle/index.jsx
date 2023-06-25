import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import {} from "react-redux";
import { useNavigate } from "react-router-dom";
import {} from "../0.Store/comp.js";
import { useLocalStorage } from "../5.hooks/localStorage.js";

const ButtonGoogle = () => {
  const [, setLoginAlert] = useLocalStorage("loginAlert");
  const [, setCredentialStorage] = useLocalStorage("credential");
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={(res) => {
        setLoginAlert(true);
        setCredentialStorage(res.credential);
        navigate("/");
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default ButtonGoogle;
