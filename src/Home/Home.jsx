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
import DrawerComponents from "./DrawerComponents";

function Home() {
  let history = useHistory();

  const content = (
    <div className="grid">
      <div className="container">
        <div>
          <img className="backgroundImg" src={backgroundImg} alt="" />
        </div>
        <WingBlank>
          <Card>
            <Card.Header title="Menu" />
            <Card.Body>
              <List>
                <List.Item
                  arrow="horizontal"
                  onClick={() => {
                    history.push("/BuktiPembayaran");
                  }}
                >
                  Verifikasi Bukti Pembayaran
                  <List.Item.Brief>
                    Memeriksa Bukti Pembayaran <br />
                    Yang telah Diunggah oleh Pelanggan
                  </List.Item.Brief>
                </List.Item>
                <WhiteSpace/>
                <List.Item
                  arrow="horizontal"
                  onClick={() => {
                    history.push("/TabelJadwalMenu");
                  }}
                >
                  Tabel Jadwal Menu
                  <List.Item.Brief>
                    Melihat maupun Mengedit Jadwal <br />
                    Menu yang Telah Dibuat <br />
                    Sebelumnya dan Menambahkan <br /> Menu Baru
                  </List.Item.Brief>
                </List.Item>
                <WhiteSpace/>
                <List.Item
                  arrow="horizontal"
                  onClick={() => {
                    history.push("/TabelPesanan");
                  }}
                >
                  Tabel Pesanan
                  <List.Item.Brief>
                    Melihat maupun Mengedit Hasil <br />
                    Pemesanan / Penukaran Kupon <br />
                    oleh Pelanggan
                  </List.Item.Brief>
                </List.Item>
                <WhiteSpace/>
                <List.Item
                  arrow="horizontal"
                  onClick={() => {
                    history.push("/TabelPaketKupon");
                  }}
                >
                  Tabel Paket Kupon
                  <List.Item.Brief>
                    Melihat maupun Mengedit Paket <br />
                    Kupon yang Telah Dibuat
                  </List.Item.Brief>
                </List.Item>
                <WhiteSpace/>
                <List.Item
                  arrow="horizontal"
                  onClick={() => {
                    history.push("/TabelPelanggan");
                  }}
                >
                  Tabel Pelanggan
                  <List.Item.Brief>
                    Melihat maupun Mengedit Pelanggan <br />
                    yang Telah Terdaftar
                  </List.Item.Brief>
                </List.Item>
                <WhiteSpace/>
                <List.Item
                  arrow="horizontal"
                  onClick={() => {
                    history.push("/TabelKuponPelanggan");
                  }}
                >
                  Tabel Kupon Pelanggan
                  <List.Item.Brief>
                    Melihat maupun Mengedit Kupon <br />
                    yang Telah Dibeli Oleh Pelanggan
                  </List.Item.Brief>
                </List.Item>
              </List>
            </Card.Body>
          </Card>
        </WingBlank>
      </div>
    </div>
  );

  return (
    <div>
      <DrawerComponents title="Beranda" content={content} />
    </div>
  );
}
export default Home;
