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

import UrlApi from "../UrlApi";
import "./Home.css";
import backgroundImg from "./background.svg";

function Home() {
  let history = useHistory();
  
  // ! atas hapus
  const [open, setOpen] = useState(false);
  const onOpenChange = (...args) => {
    console.log(args);
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
        <div>
          <img className="backgroundImg" src={backgroundImg} alt="" />
        </div>
        <WingBlank>
          <Card>
            <Card.Header title="Menu" />
            <Card.Body>
              <Button type="ghost">Verifikasi Bukti Pembayaran</Button>
              <WhiteSpace size="lg" />
              <Button type="ghost">Tabel Jadwal Menu</Button>
              <WhiteSpace size="lg" />
              <Button type="ghost">Tabel Pesanan</Button>
              <WhiteSpace size="lg" />
              <Button type="ghost">Tabel Paket Kupon</Button>
              <WhiteSpace size="lg" />
              <Button type="ghost">Tabel Pelanggan</Button>
              <WhiteSpace size="lg" />
              <Button type="ghost">Tabel Kupon Pelanggan</Button>
            </Card.Body>
          </Card>
        </WingBlank>
      </Drawer>
    </div>
  );
}
export default Home;
