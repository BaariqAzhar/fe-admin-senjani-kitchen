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
import { Input } from "antd";

import UrlApi from "../UrlApi";
import "./Pengaturan.css";
import DrawerComponents from "../Home/DrawerComponents";
import IsLogin from "../Auth/IsLogin";

function Pengaturan() {
  let history = useHistory();
  const qs = require("qs");

  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")));

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isSame, setIsSame] = useState();
  const onChangeNama = (value) => {
    setNama(value.target.value);
  };
  const onChangeEmail = (value) => {
    setEmail(value.target.value);
  };
  const onChangePassword = (value) => {
    setPassword(value.target.value);
  };
  const onChangeRepassword = (value) => {
    setRepassword(value.target.value);
  };
  useEffect(() => {
    if (password === repassword) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }, [password, repassword]);

  const onClickDaftarkan = async () => {
    if (nama === "" || email === "" || password === "" || repassword === "") {
      alert("Semua form tambah akun admin harus terisi");
    } else if (!isSame) {
      alert("Form password dan ulangi password harus sama");
    } else {
      const keyValue = {
        email_admin: email,
        password: password,
        nama_lengkap_admin: nama,
      };
      try {
        const res = await axios.post(
          `${UrlApi}admin/register`,
          qs.stringify(keyValue)
        );
        if (res.data.status === "success") {
          alert("Pendaftaran berhasi, Akun admin baru berhasil dibuat");
          window.location.reload(false);
        } else if (
          res.data.status === "failed" &&
          res.data.info === "email already has registered"
        ) {
          alert(
            "Pendaftaran gagal, karena email admin telah terdaftar sebelumnya"
          );
        }
      } catch {
        alert("Akun admin baru tidak berhasil dibuat");
      }
    }
  };

  const content = (
    <div className="grid">
      <div className="container">
        <WingBlank>
          <Card>
            <Card.Header title="Akun" />
            <Card.Body>
              <List>
                <List.Item>
                  <h4>Nama</h4>
                  <p>{admin.nama_lengkap_admin}</p>
                </List.Item>
                <List.Item>
                  <h4>Email</h4>
                  <p>{admin.email_admin}</p>
                </List.Item>
                {/* <Button type="warning">Keluar</Button> */}
              </List>
            </Card.Body>
          </Card>
          <WhiteSpace size="lg" />
          <Card>
            <Card.Header title="Tambah Akun Admin" />
            <Card.Body>
              <List>
                <List.Item>
                  <p style={{ width: "100%" }}>
                    Mendaftarkan akun admin baru hanya bisa dilakukan oleh akun
                    admin lainnya
                  </p>
                  <h4>Nama Admin</h4>
                  <Input.TextArea
                    onChange={onChangeNama}
                    placeholder="E.g: Baariq Azhar"
                    autoSize
                  />
                  <WhiteSpace />
                  <h4>Email</h4>
                  <Input.TextArea
                    onChange={onChangeEmail}
                    placeholder="E.g: baariqazhar@gmail.com"
                    autoSize
                  />
                  <WhiteSpace />
                  <h4>Password</h4>
                  <Input.Password
                    onChange={onChangePassword}
                    placeholder="*******"
                  />
                  <WhiteSpace />
                  <h4>Ulangi Password</h4>
                  <Input.Password
                    onChange={onChangeRepassword}
                    placeholder="*******"
                  />
                  {isSame ? (
                    <></>
                  ) : (
                    <p>Password dan ulangi password harus sama</p>
                  )}
                </List.Item>
                <WhiteSpace />
                <Button onClick={onClickDaftarkan} type="primary">
                  Daftarkan
                </Button>
              </List>
            </Card.Body>
          </Card>
        </WingBlank>
      </div>
    </div>
  );

  return (
    <div>
      <IsLogin />
      <DrawerComponents title="Pengaturan" content={content} />
    </div>
  );
}
export default Pengaturan;
