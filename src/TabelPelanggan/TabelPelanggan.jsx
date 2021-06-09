import { Button, WhiteSpace, Card, InputItem } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import axios from "axios";
import { useState, useEffect, useDebugValue } from "react";
import { Link, useHistory } from "react-router-dom";
import { Table, Modal, DatePicker, Radio, Input, Space } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

import DrawerComponents from "../Home/DrawerComponents";
import UrlApi from "../UrlApi";
import waktuMenu from "../Function/waktuMenu";

function TabelPelanggan() {
  const [dataState, setDataState] = useState([]);
  const processApiShowAllMenu = () => {
    axios
      .post(`${UrlApi}pelanggan/showAllPelanggan`)
      .then((respone) => setDataState(respone.data));
  };
  useEffect(() => {
    processApiShowAllMenu();
  }, []);
  useEffect(() => {
    console.log(dataState);
  }, [dataState]);

  const columns = [
    {
      title: "ID Pelanggan",
      dataIndex: "id_pelanggan",
      sorter: (a, b) => a.id_pelanggan - b.id_pelanggan,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Nama Lengkap",
      dataIndex: "nama_lengkap",
      sorter: (a, b) => a.nama_lengkap.localeCompare(b.nama_lengkap),
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      sorter: (a, b) => a.alamat.localeCompare(b.alamat),
    },
    {
      title: "No HP (Whatsapp)",
      dataIndex: "no_hp_wa",
      sorter: (a, b) => a.no_hp_wa.localeCompare(b.no_hp_wa),
    },
    {
      title: "Catatan Makanan",
      dataIndex: "alergi_makanan",
      sorter: (a, b) => a.alergi_makanan.localeCompare(b.alergi_makanan),
    },
    {
      title: "Edit",
      dataIndex: "id_pelanggan",
      render: (idPelanggan) => (
        <Button
          onClick={() => {
            showEditModal(idPelanggan);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  // ! Edit Modal
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState();
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
  const showEditModal = (idPelanggan) => {
    var result = dataState.findIndex(
      (entry) => entry.id_pelanggan === idPelanggan
    );
    setSelectedKey(result);
    console.log(dataState[result]);
    setEditIdPelanggan(dataState[result].id_pelanggan);
    setEditEmail(dataState[result].email);
    setEditNamaLengkap(dataState[result].nama_lengkap);
    setEditAlamat(dataState[result].alamat);
    setEditNoHpWa(dataState[result].no_hp_wa);
    setEditAlergiMakanan(dataState[result].alergi_makanan);
    setIsEditModalVisible(true);
  };
  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const [editIdPelanggan, setEditIdPelanggan] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editNamaLengkap, setEditNamaLengkap] = useState("");
  const [editAlamat, setEditAlamat] = useState("");
  const [editNoHpWa, setEditNoHpWa] = useState("");
  const [editAlergiMakanan, setEditAlergiMakanan] = useState("");

  const onChangeEditEmail = (value) => {
    setEditEmail(value.target.value);
  };
  const onChangeEditNamaLengkap = (value) => {
    setEditNamaLengkap(value.target.value);
  };
  const onChangeEditAlamat = (value) => {
    setEditAlamat(value.target.value);
  };
  const onChangeEditNoHpWa = (value) => {
    setEditNoHpWa(value);
  };
  const onChangeEditAlergiMakanan = (value) => {
    setEditAlergiMakanan(value.target.value);
  };

  const handleOkEdit = async () => {
    setConfirmLoadingEdit(true);
    if (
      editEmail === "" ||
      editNamaLengkap === "" ||
      editAlamat === "" ||
      editNoHpWa === "" ||
      editAlergiMakanan === ""
    ) {
      alert("Semua form harus terisi");
      setConfirmLoadingEdit(false);
    } else {
      const data = new FormData();
      data.append("id_pelanggan", editIdPelanggan);
      data.append("email", editEmail);
      data.append("nama_lengkap", editNamaLengkap);
      data.append("alamat", editAlamat);
      data.append("no_hp_wa", editNoHpWa);
      data.append("alergi_makanan", editAlergiMakanan);

      const res = await axios.post(`${UrlApi}pelanggan/updatePelanggan`, data);
      console.log(res);
      if (res.data.status === "success") {
        alert("Data Pelanggan Berhasil Diubah");
        setConfirmLoadingEdit(false);
        setIsEditModalVisible(false);
        window.location.reload(false);
      } else {
        alert("Data Pelanggan Tidak Berhasil Diubah");
        setConfirmLoadingEdit(false);
        setIsEditModalVisible(false);
        window.location.reload(false);
      }
    }
  };

  const content = (
    <div>
      <Card>
        <Card.Body>
          <Table columns={columns} dataSource={dataState} />
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div>
      <DrawerComponents title="Tabel Pelanggan" content={content} />
      <Modal
        title="Edit Menu"
        visible={isEditModalVisible}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        {dataState ? (
          <div>
            <h4>ID Pelanggan</h4>
            <h4>{editIdPelanggan}</h4>
            <WhiteSpace />
            <h4>Email</h4>
            <Input.TextArea
              value={editEmail}
              onChange={onChangeEditEmail}
              placeholder="e.g: baariqazhar@gmail.com"
              autoSize
            />
            <WhiteSpace />
            <h4>Nama Lengkap</h4>
            <Input.TextArea
              value={editNamaLengkap}
              onChange={onChangeEditNamaLengkap}
              placeholder="e.g: Baariq Fairuuz Azhar"
              autoSize
            />
            <WhiteSpace />
            <h4>Alamat</h4>
            <Input.TextArea
              value={editAlamat}
              onChange={onChangeEditAlamat}
              placeholder="e.g: Jl. Candi 2C No.557 (Kos Rahman 99), 
              Karangbesuki, Kec. Sukun, Kota Malang"
              autoSize
            />
            <WhiteSpace />
            <h4>No Hp (Whatsapp)</h4>
            <InputItem
              value={editNoHpWa}
              onChange={onChangeEditNoHpWa}
              type="number"
              placeholder="087738210702"
            ></InputItem>
            <WhiteSpace />
            <h4>Catatan Makanan</h4>
            <Input.TextArea
              value={editAlergiMakanan}
              onChange={onChangeEditAlergiMakanan}
              placeholder="e.g: tidak suka pedas/ alergi kacang"
              autoSize
            />
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
}
export default TabelPelanggan;
