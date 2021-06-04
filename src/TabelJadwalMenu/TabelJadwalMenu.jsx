import { Button, WhiteSpace, Card } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import axios from "axios";
import { useState, useEffect, useDebugValue } from "react";
import { Link, useHistory } from "react-router-dom";
import { Table, Modal, DatePicker, Radio, Input } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

import DrawerComponents from "../Home/DrawerComponents";
import UrlApi from "../UrlApi";
import waktuMenu from "../Function/waktuMenu";

function TabelJadwalMenu() {
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

  const columns = [
    {
      title: "ID Menu",
      dataIndex: "id_menu",
      sorter: (a, b) => a.id_menu - b.id_menu,
    },
    {
      title: "Tanggal Menu",
      dataIndex: "tanggal_menu",
      sorter: (a, b) => new Date(a.tanggal_menu) - new Date(b.tanggal_menu),
    },
    {
      title: "Waktu Menu",
      dataIndex: "waktu_menu",
      render: (text) => <p>{waktuMenu(text)}</p>,
      filters: [
        {
          text: "Pagi",
          value: "pagi",
        },
        {
          text: "Siang",
          value: "siang",
        },
        {
          text: "Sore",
          value: "sore",
        },
      ],
      onFilter: (value, record) => record.waktu_menu.indexOf(value) === 0,
    },
    {
      title: "Nama Menu",
      dataIndex: "nama_menu",
    },
    {
      title: "Keterangan Menu",
      dataIndex: "keterangan_menu",
    },
    {
      title: "Lauk Tambahan",
      dataIndex: "lauk_tambahan_menu",
    },
    {
      title: "Foto Menu",
      dataIndex: "foto_menu",
      render: (fotoMenu) => (
        <Button
          onClick={() => {
            showModal(fotoMenu);
          }}
        >
          Lihat Foto
        </Button>
      ),
    },
    {
      title: "Edit",
      dataIndex: "id_menu",
      render: (idMenu) => (
        <Button
          onClick={() => {
            showEditModal(idMenu);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  // ! Foto Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFotoMenu, setSelectedFotoMenu] = useState("");
  const showModal = (fotoMenu) => {
    setSelectedFotoMenu(fotoMenu);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const content = (
    <div>
      <Card>
        <Card.Body>
          <Button
            onClick={() => showCreateModal()}
            type="primary"
            style={{ width: "150px" }}
          >
            Tambah Menu
          </Button>
          <Table columns={columns} dataSource={dataState} />
        </Card.Body>
      </Card>
    </div>
  );

  // ! Create Modal
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [nama, setNama] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [laukTambahan, setLaukTambahan] = useState("");
  const [foto, setFoto] = useState("");
  const onChangeTanggal = (date, dateString) => {
    console.log(date);
    setTanggal(dateString);
  };
  const onChangeWaktu = (value) => {
    console.log(value.target.value);
    setWaktu(value.target.value);
  };
  const onChangeNama = (value) => {
    console.log(value.target.value);
    setNama(value.target.value);
  };
  const onChangeKeterangan = (value) => {
    setKeterangan(value.target.value);
  };
  const onChangeLaukTambahan = (value) => {
    setLaukTambahan(value.target.value);
  };
  const handleInputChange = (event) => {
    setFoto(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };
  const handleOkCreate = async () => {
    setConfirmLoading(true);
    if (
      tanggal === "" ||
      waktu === "" ||
      nama === "" ||
      keterangan === "" ||
      laukTambahan === "" ||
      foto === ""
    ) {
      alert("Semua form harus terisi");
      setConfirmLoading(false);
    } else {
      const data = new FormData();
      data.append("tanggal_menu", tanggal);
      data.append("waktu_menu", waktu);
      data.append("nama_menu", nama);
      data.append("keterangan_menu", keterangan);
      data.append("lauk_tambahan_menu", laukTambahan);
      data.append("foto_menu", foto);
      const res = await axios.post(`${UrlApi}menu/createMenu`, data);
      console.log(res);
      if (res.data.status === "success") {
        alert("Menu baru sukses terkrim");
        setConfirmLoading(false);
        setIsCreateModalVisible(false);
        window.location.reload(false);
      } else {
        alert("Menu gagal terkirim");
        setConfirmLoading(false);
        setIsCreateModalVisible(false);
        window.location.reload(false);
      }
    }
  };
  const handleCancelCreate = () => {
    setIsCreateModalVisible(false);
  };

  // ! Edit Modal
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState();
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
  const showEditModal = (idMenu) => {
    var result = dataState.findIndex((entry) => entry.id_menu === idMenu);
    setSelectedKey(result);
    console.log(dataState[result]);
    setEditIdMenu(dataState[result].id_menu);
    setEditTanggal(dataState[result].tanggal_menu);
    setEditWaktu(dataState[result].waktu_menu);
    setEditNamaMenu(dataState[result].nama_menu);
    setEditKeterangan(dataState[result].keterangan_menu);
    setEditLaukTambahan(dataState[result].lauk_tambahan_menu);
    setEditFoto(dataState[result].foto_menu);
    setIsEditModalVisible(true);
  };
  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };
  const [editIdMenu, setEditIdMenu] = useState("");
  const [editTanggal, setEditTanggal] = useState("");
  const [editWaktu, setEditWaktu] = useState("");
  const [editNamaMenu, setEditNamaMenu] = useState("");
  const [editKeterangan, setEditKeterangan] = useState("");
  const [editLaukTambahan, setEditLaukTambahan] = useState("");
  const [editFoto, setEditFoto] = useState("");
  const onChangeEditTanggal = (date, dateString) => {
    console.log(dateString);
    setEditTanggal(dateString);
  };
  const onChangeEditWaktu = (value) => {
    console.log(value.target.value);
    setEditWaktu(value.target.value);
  };
  const onChangeEditNamaMenu = (value) => {
    console.log(value.target.value);
    setEditNamaMenu(value.target.value);
  };
  const onChangeEditKeterangan = (value) => {
    setEditKeterangan(value.target.value);
  };
  const onChangeEditLaukTambahan = (value) => {
    setEditLaukTambahan(value.target.value);
  };
  const handleInputChangeEdit = (event) => {
    setEditFoto(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  const handleOkEdit = async () => {
    setConfirmLoadingEdit(true);
    if (
      editTanggal === "" ||
      editWaktu === "" ||
      editNamaMenu === "" ||
      editKeterangan === "" ||
      editLaukTambahan === ""
    ) {
      alert("Semua form harus terisi");
      setConfirmLoadingEdit(false);
    } else {
      const data = new FormData();
      data.append("id_menu", editIdMenu);
      data.append("tanggal_menu", editTanggal);
      data.append("waktu_menu", editWaktu);
      data.append("nama_menu", editNamaMenu);
      data.append("keterangan_menu", editKeterangan);
      data.append("lauk_tambahan_menu", editLaukTambahan);

      if (typeof editFoto === "string") {
        console.log("non foto, edit foto adalah string");
        console.log(data);
        const res = await axios.post(`${UrlApi}menu/updateMenuNoFoto`, data);
        console.log(res);
        if (res.data.status === "success") {
          alert("Menu Berhasil Diubah");
          setConfirmLoadingEdit(false);
          setIsEditModalVisible(false);
          window.location.reload(false);
        } else {
          alert("Menu Tidak Berhasil Diubah");
          setConfirmLoadingEdit(false);
          setIsEditModalVisible(false);
          window.location.reload(false);
        }
      } else {
        data.append("foto_menu", editFoto);
        console.log("update pakai foto, edit foto bukan string");
        console.log(data);
        const res = await axios.post(`${UrlApi}menu/updateMenu`, data);
        console.log(res);
        if (res.data.status === "success") {
          alert("Menu Berhasil Diubah");
          setConfirmLoadingEdit(false);
          setIsEditModalVisible(false);
          window.location.reload(false);
        } else {
          alert("Menu Tidak Berhasil Diubah");
          setConfirmLoadingEdit(false);
          setIsEditModalVisible(false);
          window.location.reload(false);
        }
      }
    }
  };

  return (
    <div>
      <DrawerComponents title="Tabel Jadwal Menu" content={content} />
      <Modal
        title="Foto Menu"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <img
          src={`${UrlApi}assets/fotoMenu/${selectedFotoMenu}`}
          style={{ width: "100%" }}
          alt=""
        />
      </Modal>
      <Modal
        title="Tambah Menu Baru"
        visible={isCreateModalVisible}
        onOk={handleOkCreate}
        onCancel={handleCancelCreate}
        confirmLoading={confirmLoading}
      >
        <h4>Tanggal Menu</h4>
        <DatePicker onChange={onChangeTanggal} />
        <WhiteSpace />
        <h4>Waktu Menu</h4>
        <Radio.Group buttonStyle="solid" onChange={onChangeWaktu}>
          <Radio.Button value="pagi">Pagi</Radio.Button>
          <Radio.Button value="siang">Siang</Radio.Button>
          <Radio.Button value="sore">Sore</Radio.Button>
        </Radio.Group>
        <WhiteSpace />
        <h4>Nama Menu</h4>
        <Input.TextArea
          onChange={onChangeNama}
          placeholder="Ayam Geprek Krispy"
          autoSize
        />
        <WhiteSpace />
        <h4>Keterangan Menu</h4>
        <Input.TextArea
          onChange={onChangeKeterangan}
          placeholder="Soup Jamur, Buah Melon"
          autoSize
        />
        <WhiteSpace />
        <h4>Lauk Tambahan</h4> <p>*untuk paket kupon deluxe</p>
        <Input.TextArea
          onChange={onChangeLaukTambahan}
          placeholder="Tempe Krispi"
          autoSize
        />
        <WhiteSpace />
        <h4>Unggah Foto</h4>
        <input
          type="file"
          className="form-control"
          name="upload_file"
          onChange={handleInputChange}
          accept="image/*"
          required
        />
      </Modal>
      <Modal
        title="Edit Menu"
        visible={isEditModalVisible}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        {selectedKey >= 0 && dataState ? (
          <div>
            <h4>ID Menu</h4>
            <p>{editIdMenu}</p>
            <WhiteSpace />
            <h4>Tanggal Menu</h4>
            <DatePicker
              defaultValue={moment(editTanggal, "YYYY-MM-DD")}
              onChange={onChangeEditTanggal}
            />
            <WhiteSpace />
            <h4>Waktu Menu</h4>
            <Radio.Group
              buttonStyle="solid"
              value={editWaktu}
              onChange={onChangeEditWaktu}
            >
              <Radio.Button value="pagi">Pagi</Radio.Button>
              <Radio.Button value="siang">Siang</Radio.Button>
              <Radio.Button value="sore">Sore</Radio.Button>
            </Radio.Group>
            <WhiteSpace />
            <h4>Nama Menu</h4>
            <Input.TextArea
              value={editNamaMenu}
              onChange={onChangeEditNamaMenu}
              placeholder="Ayam Geprek Krispy"
              autoSize
            />
            <WhiteSpace />
            <h4>Keterangan Menu</h4>
            <Input.TextArea
              value={editKeterangan}
              onChange={onChangeEditKeterangan}
              placeholder="Soup Jamur, Buah Melon"
              autoSize
            />
            <WhiteSpace />
            <h4>Lauk Tambahan</h4> <p>*untuk paket kupon deluxe</p>
            <Input.TextArea
              value={editLaukTambahan}
              onChange={onChangeEditLaukTambahan}
              placeholder="Tempe Krispi"
              autoSize
            />
            <WhiteSpace />
            <h4>Unggah Foto</h4>
            <img
              src={`${UrlApi}assets/fotoMenu/${editFoto}`}
              style={{ width: "50%" }}
              alt=""
            />
            <input
              type="file"
              className="form-control"
              name="upload_file"
              accept="image/*"
              onChange={handleInputChangeEdit}
              required
            />
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
}
export default TabelJadwalMenu;
