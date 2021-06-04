import {
  Button,
  WhiteSpace,
  WingBlank,
  Drawer,
  NavBar,
  Icon,
  List,
  Card,
} from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import axios from "axios";
import { useState, useEffect, useDebugValue } from "react";
import { Link, useHistory } from "react-router-dom";

import UrlApi from ".././UrlApi";

function BaseTabelJadwalMenu() {
  let history = useHistory();

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

  const [open, setOpen] = useState(false);
  const onOpenChange = () => {
    setOpen(!open);
  };
  const Sidebar = (
    <List>
      <List.Item
        onClick={() => {
          history.push("/");
        }}
      >
        Beranda
      </List.Item>
      <List.Item>Verifikasi Bukti Pembayaran</List.Item>
      <List.Item
        onClick={() => {
          history.push("/TabelJadwalMenu");
        }}
      >
        Tabel Jadwal Menu
      </List.Item>
      <List.Item>Tabel Pesanan</List.Item>
      <List.Item>Tabel Paket Kupon</List.Item>
      <List.Item>Tabel Pelanggan</List.Item>
      <List.Item>Tabel Kupon Pelanggan</List.Item>
    </List>
  );

  return (
    <div>
      <NavBar
        mode="light"
        icon={<Icon type="ellipsis" />}
        onLeftClick={onOpenChange}
      >
        Beranda
      </NavBar>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        contentStyle={{ color: "#A6A6A6", textAlign: "center" }}
        sidebar={Sidebar}
        open={open}
        onOpenChange={onOpenChange}
      >
        
      </Drawer>
    </div>
  );
}
export default BaseTabelJadwalMenu;
