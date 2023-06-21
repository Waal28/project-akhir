import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../0.Store/comp.js";

const ButtonGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { decodedToken, isExpired } = useJwt(credential);
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
        dispatch(setLogin(true));
        navigate("/");
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default ButtonGoogle;
