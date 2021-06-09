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
import jenisNasi from "../Function/jenisNasi";
import jenisPaketKupon from "../Function/jenisPaketKupon";
import laukTambahan from "../Function/laukTambahan";

function TabelPaketKupon() {
  const qs = require("qs");

  const [dataState, setDataState] = useState([]);
  const processApiShowAll = async () => {
    const res = await axios.post(`${UrlApi}paketkupon/showAllPaketKupon`);
    setDataState(res.data);
  };
  useEffect(() => {
    processApiShowAll();
  }, []);
  useEffect(() => {
    console.log(dataState);
  }, [dataState]);

  const columns = [
    {
      title: "ID Paket Kupon",
      dataIndex: "id_paket_kupon",
      sorter: (a, b) => a.id_paket_kupon - b.id_paket_kupon,
    },
    {
      title: "Kode Paket Kupon",
      dataIndex: "kode_paket_kupon",
      sorter: (a, b) => a.kode_paket_kupon.localeCompare(b.kode_paket_kupon),
    },
    {
      title: "Jenis Paket Kupon",
      dataIndex: "jenis_paket_kupon",
      render: (text) => <p>{jenisPaketKupon(text)}</p>,
      filters: [
        {
          text: "Basic Meal Box",
          value: "basic_meal_box",
        },
        {
          text: "Reusable Meal Box",
          value: "reusable_meal_box",
        },
        {
          text: "Deluxe Meal Box",
          value: "deluxe_meal_box",
        },
        {
          text: "Couple Pack",
          value: "couple_pack",
        },
        {
          text: "Family Pack",
          value: "family_pack",
        },
      ],
      onFilter: (value, record) =>
        record.jenis_paket_kupon.indexOf(value) === 0,
    },
    {
      title: "Jumlah Kupon",
      dataIndex: "jumlah_kupon",
      sorter: (a, b) => a.jumlah_kupon - b.jumlah_kupon,
    },
    {
      title: "Jenis Nasi",
      dataIndex: "jenis_nasi",
      render: (text) => <p>{jenisNasi(text)}</p>,
      filters: [
        {
          text: "Nasi Merah",
          value: "nasi_merah",
        },
        {
          text: "Nasi Putih",
          value: "nasi_putih",
        },
      ],
      onFilter: (value, record) => record.jenis_nasi.indexOf(value) === 0,
    },
    {
      title: "Lauk Tambahan",
      dataIndex: "lauk_tambahan",
      render: (text) => <p>{laukTambahan(text)}</p>,
      filters: [
        {
          text: "Ada",
          value: "ada",
        },
        {
          text: "Tidak Ada",
          value: "tidak_ada",
        },
      ],
      onFilter: (value, record) => record.lauk_tambahan.indexOf(value) === 0,
    },
    {
      title: "Harga",
      dataIndex: "harga",
      sorter: (a, b) => a.harga - b.harga,
    },
    {
      title: "Edit",
      dataIndex: "id_paket_kupon",
      render: (idPaketKupon) => (
        <Button
          onClick={() => {
            showEditModal(idPaketKupon);
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
  const showEditModal = (idPaketKupon) => {
    var result = dataState.findIndex(
      (entry) => entry.id_paket_kupon === idPaketKupon
    );
    setSelectedKey(result);
    console.log(dataState[result]);
    setEditIdPaketKupon(dataState[result].id_paket_kupon);
    setEditKode(dataState[result].kode_paket_kupon);
    setEditJumlah(dataState[result].jumlah_kupon);
    setEditNasi(dataState[result].jenis_nasi);
    setEditHarga(dataState[result].harga);
    setIsEditModalVisible(true);
  };
  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const [editIdPaketKupon, setEditIdPaketKupon] = useState("");
  const [editKode, setEditKode] = useState("");
  const [editJumlah, setEditJumlah] = useState("");
  const [editNasi, setEditNasi] = useState("");
  const [editHarga, setEditHarga] = useState("");

  const onChangeEditKode = (value) => {
    setEditKode(value.target.value);
  };
  const onChangeEditJumlah = (value) => {
    setEditJumlah(value);
  };
  const onChangeEditNasi = (value) => {
    setEditNasi(value.target.value);
  };
  const onChangeEditHarga = (value) => {
    setEditHarga(value);
  };

  const handleOkEdit = async () => {
    setConfirmLoadingEdit(true);
    if (
      (editKode === "", editJumlah === "", editNasi === "", editHarga === "")
    ) {
      setConfirmLoadingEdit(false);
      alert("Semua form harus terisi");
    } else {
      const keyValue = {
        id_paket_kupon: editIdPaketKupon,
        kode_paket_kupon: editKode,
        jumlah_kupon: editJumlah,
        jenis_nasi: editNasi,
        harga: editHarga,
      };
      console.log(keyValue);

      const res = await axios.post(
        `${UrlApi}paketkupon/updatePaketKupon`,
        qs.stringify(keyValue)
      );

      console.log(res);
      if (res.data.status === "success") {
        alert("Data Paket Kupon Berhasil Diubah");
      } else {
        alert("Data Paket Kupon Tidak Berhasil Diubah");
      }
      setConfirmLoadingEdit(false);
      setIsEditModalVisible(false);
      window.location.reload(false);
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
      <DrawerComponents title="Tabel Paket Kupon" content={content} />
      <Modal
        title="Edit Menu"
        visible={isEditModalVisible}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        {dataState ? (
          <div>
            <h4>ID Paket Kupon</h4>
            <h4>{editIdPaketKupon}</h4>
            <WhiteSpace />
            <h4>Kode</h4>
            <Input.TextArea
              value={editKode}
              onChange={onChangeEditKode}
              placeholder="e.g: DB48MIT"
              autoSize
            />
            <WhiteSpace />
            <h4>Jumlah</h4>
            <InputItem
              value={editJumlah}
              onChange={onChangeEditJumlah}
              type="number"
              placeholder="12"
            ></InputItem>
            <WhiteSpace />
            <h4>Jenis Nasi</h4>
            <Radio.Group
              buttonStyle="solid"
              value={editNasi}
              onChange={onChangeEditNasi}
            >
              <Radio.Button value="nasi_merah">Nasi Merah</Radio.Button>
              <Radio.Button value="nasi_putih">Nasi Putih</Radio.Button>
            </Radio.Group>
            <WhiteSpace />
            <h4>Harga (Rp)</h4>
            <InputItem
              value={editHarga}
              onChange={onChangeEditHarga}
              type="number"
              placeholder="e.g: 48000"
            ></InputItem>
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
}
export default TabelPaketKupon;
