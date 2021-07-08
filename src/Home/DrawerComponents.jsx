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

function DrawerComponents(props) {
  let history = useHistory();

  const [open, setOpen] = useState(false);
  const onOpenChange = () => {
    setOpen(!open);
  };

  const onClickKeluar = () => {
    localStorage.clear();
    history.push("/Login");
  };

  const Sidebar = (
    <List>
      <List.Item
        arrow="horizontal"
        onClick={() => {
          history.push("/");
        }}
      >
        Beranda
      </List.Item>
      <List.Item
        arrow="horizontal"
        onClick={() => {
          history.push("/BuktiPembayaran");
        }}
      >
        Verifikasi Bukti Pembayaran
      </List.Item>
      <List.Item
        arrow="horizontal"
        onClick={() => {
          history.push("/TabelJadwalMenu");
        }}
      >
        Tabel Jadwal Menu
      </List.Item>
      <List.Item
        arrow="horizontal"
        onClick={() => {
          history.push("/TabelPesanan");
        }}
      >
        Tabel Pesanan
      </List.Item>
      <List.Item
        arrow="horizontal"
        onClick={() => {
          history.push("/TabelPaketKupon");
        }}
      >
        Tabel Paket Kupon
      </List.Item>
      <List.Item
        arrow="horizontal"
        onClick={() => {
          history.push("/TabelPelanggan");
        }}
      >
        Tabel Pelanggan
      </List.Item>
      <List.Item
        arrow="horizontal"
        onClick={() => {
          history.push("/TabelKuponPelanggan");
        }}
      >
        Tabel Kupon Pelanggan
      </List.Item>
      <List.Item
        arrow="horizontal"
        onClick={() => {
          history.push("/Pengaturan");
        }}
      >
        Pengaturan
      </List.Item>
      <List.Item
        onClick={() => {
          onClickKeluar();
        }}
      >
        Keluar
      </List.Item>
    </List>
  );

  const heightDevice = document.documentElement.clientHeight - 60;
  console.log("clientHeight", document.documentElement.clientHeight);
  console.log("heightDevice", heightDevice);

  return (
    <div>
      <NavBar
        mode="dark"
        icon={<Icon type="ellipsis" />}
        onLeftClick={onOpenChange}
      >
        {props.title}
      </NavBar>
      <Drawer
        className="my-drawer"
        // style={{ minHeight: document.documentElement.clientHeight }}
        style={{ minHeight: heightDevice }}
        enableDragHandle
        contentStyle={{ color: "#A6A6A6", textAlign: "center" }}
        sidebar={Sidebar}
        open={open}
        onOpenChange={onOpenChange}
      >
        {props.content}
      </Drawer>
    </div>
  );
}
export default DrawerComponents;
