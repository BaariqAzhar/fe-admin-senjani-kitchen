import { Button, WhiteSpace, WingBlank } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import axios from "axios";
import { useState, useEffect, useDebugValue } from "react";

import UrlApi from "../UrlApi";
import "./Home.css";

function Home() {
  const [dataState, setDataState] = useState([]);
  const processApiShowAllMenu = () => {
    axios
      .post(`${UrlApi}menu/showAllMenu`)
      .then((respone) => setDataState(respone.data));
  };
  useEffect(() => {
    processApiShowAllMenu();
  }, []);
  useEffect(() => {
    console.log(dataState);
  }, [dataState]);

  return (
    <div>
      you are in home
      <Button type="primary">primary</Button>
      <WhiteSpace />
      <p className="coba">hoho asi tadeaes noiasdbn asd</p>
    </div>
  );
}
export default Home;
