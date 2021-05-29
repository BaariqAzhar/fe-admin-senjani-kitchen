import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { List, InputItem, WhiteSpace, WingBlank, Button } from "antd-mobile";

import UrlApi from "../UrlApi";
import Logo from "./logo.svg";
import "./LoginRegister.css";

function Login() {
  let history = useHistory();
  const qs = require("qs");

  const [dataApi, setDataApi] = useState();
  const [dataAdmin, setDataAdmin] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const loginProcess = async () => {
    const keyValue = {
      email_admin: emailState,
      password: passwordState,
    };

    const data = await axios.post(
      `${UrlApi}admin/login`,
      qs.stringify(keyValue)
    );
    setDataApi(data);
    if ((await data.data.status) === "success") {
      setDataAdmin(await data.data.dataAdmin[0]);
      localStorage.setItem(
        "admin",
        JSON.stringify(await data.data.dataAdmin[0])
      );
      setIsLogin(true);
      localStorage.setItem("isLogin", JSON.stringify(true));
      console.log("login success");
      history.push("/");
    } else if ((await data.data.info) === "email is not registered") {
      setIsLogin(false);
      localStorage.setItem("isLogin", JSON.stringify(false));
      alert("email tidak terdaftar");
    } else if (
      (await data.data.info) === "email is correct, password is incorrect"
    ) {
      setIsLogin(false);
      localStorage.setItem("isLogin", JSON.stringify(false));
      console.log("login failed");
      alert("password tidak tepat");
    }
  };
  useEffect(() => {
    console.log(dataApi);
  }, [dataApi]);
  useEffect(() => {
    console.log(dataAdmin);
  }, [dataAdmin]);
  useEffect(() => {
    console.log("isLogin : " + isLogin);
  }, [isLogin]);

  const [emailState, setEmailState] = useState();
  const [passwordState, setPasswordState] = useState();
  const onChangeEmail = (value) => {
    setEmailState(value);
  };
  const onChangePassword = (value) => {
    setPasswordState(value);
  };

  useEffect(() => {
    console.log(emailState);
  }, [emailState]);
  useEffect(() => {
    console.log(passwordState);
  }, [passwordState]);

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div>
      <div className="container">
        <div>
          <div className="backgroundA"></div>
          <div className="backgroundB"></div>
        </div>
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
      </div>
      <WingBlank>
        <h3>Masuk Akun Admin Senjanimu</h3>
        <InputItem
          placeholder="abc@email.com"
          type="email"
          onChange={onChangeEmail}
        >
          Email
        </InputItem>
        <InputItem
          placeholder="*****"
          type="password"
          onChange={onChangePassword}
        >
          Password
        </InputItem>
        <WhiteSpace size="md" />
        <Button type="primary" onClick={loginProcess}>
          Masuk
        </Button>
        <br /> <button onClick={clearLocalStorage}>clear localStorage</button>
      </WingBlank>
    </div>
  );
}

export default Login;
