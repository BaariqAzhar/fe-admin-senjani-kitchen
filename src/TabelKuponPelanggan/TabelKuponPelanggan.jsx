import { Button, WhiteSpace, Card, InputItem } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import axios from "axios";
import { useState, useEffect, useDebugValue } from "react";
import { Link, useHistory } from "react-router-dom";
import { Table, Modal, DatePicker, Radio, Input, Form } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

import DrawerComponents from "../Home/DrawerComponents";
import UrlApi from "../UrlApi";
import waktuMenu from "../Function/waktuMenu";
import jenisPaketKupon from "../Function/jenisPaketKupon";
import statusKupon from "../Function/statusKupon";
import caraPembayaran from "../Function/caraPembayaran";

function TabelKuponPelanggan() {
  const [dataState, setDataState] = useState([]);
  const processApiShowAllKuponPelanggan = () => {
    axios
      .post(`${UrlApi}mix/showAllKuponPelanggan`)
      .then((respone) => setDataState(respone.data));
  };
  useEffect(() => {
    processApiShowAllKuponPelanggan();
  }, []);
  useEffect(() => {
    console.log(dataState);
  }, [dataState]);

  const columns = [
    {
      title: "ID Kupon Pelanggan",
      dataIndex: "id_kupon_pelanggan",
      width: 50,
      sorter: (a, b) => a.id_kupon_pelanggan - b.id_kupon_pelanggan,
    },
    {
      title: "Pelanggan",
      children: [
        {
          title: "ID",
          dataIndex: "id_pelanggan",
          width: 50,
          sorter: (a, b) => a.id_pelanggan - b.id_pelanggan,
        },
        {
          title: "Nama",
          dataIndex: "nama_lengkap",
          sorter: (a, b) => a.nama_lengkap.localeCompare(b.nama_lengkap),
        },
      ],
    },
    {
      title: "Paket Kupon",
      children: [
        {
          title: "ID",
          dataIndex: "id_paket_kupon",
          width: 50,
          sorter: (a, b) => a.id_paket_kupon - b.id_paket_kupon,
        },
        {
          title: "Kode",
          dataIndex: "kode_paket_kupon",
          sorter: (a, b) =>
            a.kode_paket_kupon.localeCompare(b.kode_paket_kupon),
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
      ],
    },
    {
      title: "Tanggal Pembelian",
      dataIndex: "tanggal_pembelian_kupon",
      sorter: (a, b) =>
        new Date(a.tanggal_pembelian_kupon) -
        new Date(b.tanggal_pembelian_kupon),
    },
    {
      title: "Tanggal Kedaluwarsa",
      dataIndex: "tanggal_kedaluwarsa",
      sorter: (a, b) =>
        new Date(a.tanggal_kedaluwarsa) - new Date(b.tanggal_kedaluwarsa),
    },
    {
      title: "Jumlah Kupon Tersisa",
      dataIndex: "jumlah_kupon_tersisa",
      width: 50,
      sorter: (a, b) => a.jumlah_kupon_tersisa - b.jumlah_kupon_tersisa,
    },
    {
      title: "Status Kupon",
      dataIndex: "status_kupon",
      render: (text) => <p>{statusKupon(text)}</p>,
      filters: [
        {
          text: "Belum Dibayar",
          value: "belum_dibayar",
        },
        {
          text: "Menunggu Dibayar",
          value: "menunggu_dibayar",
        },
        {
          text: "Sudah Dibayar",
          value: "sudah_dibayar",
        },
        {
          text: "Gagal Dibayar",
          value: "gagal_dibayar",
        },
      ],
      onFilter: (value, record) => record.status_kupon.indexOf(value) === 0,
    },
    {
      title: "Cara Pembayaran",
      dataIndex: "cara_pembayaran",
      render: (text) => <p>{caraPembayaran(text)}</p>,
      filters: [
        {
          text: "Ovo",
          value: "ovo",
        },
        {
          text: "Gopay",
          value: "gopay",
        },
        {
          text: "Dana",
          value: "dana",
        },
        {
          text: "LinkAja",
          value: "link_aja",
        },
        {
          text: "BNI",
          value: "bni",
        },
        {
          text: "Jenius",
          value: "jenius",
        },
      ],
      onFilter: (value, record) => record.cara_pembayaran.indexOf(value) === 0,
    },
    {
      title: "Bukti Pembayaran",
      dataIndex: "bukti_pembayaran",
      render: (buktiPembayaran) => (
        <Button
          onClick={() => {
            showModal(buktiPembayaran);
          }}
          type="ghost"
        >
          Lihat
        </Button>
      ),
    },
    {
      title: "Waktu Batas Pembayaran",
      dataIndex: "waktu_batas_pembayaran",
      sorter: (a, b) =>
        new Date(a.waktu_batas_pembayaran) - new Date(b.waktu_batas_pembayaran),
    },
    {
      title: "Edit",
      dataIndex: "id_kupon_pelanggan",
      render: (idKuponPelanggan) => (
        <Button
          onClick={() => {
            showEditModal(idKuponPelanggan);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  // ! Foto Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGambar, setSelectedGambar] = useState("");
  const showModal = (buktiPembayaran) => {
    setSelectedGambar(buktiPembayaran);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // ! Edit Modal
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState();
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
  const showEditModal = (idKuponPelanggan) => {
    var result = dataState.findIndex(
      (entry) => entry.id_kupon_pelanggan === idKuponPelanggan
    );
    setSelectedKey(result);
    console.log(dataState[result]);
    setEditIdKuponPelanggan(dataState[result].id_kupon_pelanggan);
    setEditPaketKupon(
      dataState[result].id_paket_kupon +
        ", " +
        dataState[result].kode_paket_kupon +
        ", " +
        jenisPaketKupon(dataState[result].jenis_paket_kupon)
    );
    setEditPelanggan(
      dataState[result].id_pelanggan + ", " + dataState[result].nama_lengkap
    );
    setEditTanggalPembelian(dataState[result].tanggal_pembelian_kupon);
    setEditTanggalKedaluwarsa(dataState[result].tanggal_kedaluwarsa);
    setEditJumlahKuponTersisa(dataState[result].jumlah_kupon_tersisa);
    setEditStatusKupon(dataState[result].status_kupon);
    setEditCaraPembayaran(dataState[result].cara_pembayaran);
    setEditBuktiPembayaran(dataState[result].bukti_pembayaran);
    setEditWaktuBatas(dataState[result].waktu_batas_pembayaran);

    setIsEditModalVisible(true);
  };
  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const [editIdKuponPelanggan, setEditIdKuponPelanggan] = useState("");
  const [editPaketKupon, setEditPaketKupon] = useState("");
  const [editPelanggan, setEditPelanggan] = useState("");
  const [editTanggalPembelian, setEditTanggalPembelian] = useState("");
  const [editTanggalKedaluwarsa, setEditTanggalKedaluwarsa] = useState("");
  const [editJumlahKuponTersisa, setEditJumlahKuponTersisa] = useState("");
  const [editStatusKupon, setEditStatusKupon] = useState("");
  const [editCaraPembayaran, setEditCaraPembayaran] = useState("");
  const [editBuktiPembayaran, setEditBuktiPembayaran] = useState("");
  const [editWaktuBatas, setEditWaktuBatas] = useState("");
  const onChangeEditTanggalPembelian = (date, dateString) => {
    console.log(dateString);
    setEditTanggalPembelian(dateString);
  };
  const onChangeEditTanggalKedaluwarsa = (date, dateString) => {
    console.log(dateString);
    setEditTanggalKedaluwarsa(dateString);
  };
  const onChangeEditJumlahKuponTersisa = (value) => {
    setEditJumlahKuponTersisa(value);
  };
  const onChangeEditStatusKupon = (value) => {
    console.log(value.target.value);
    setEditStatusKupon(value.target.value);
  };
  const onChangeEditCaraPembayaran = (value) => {
    console.log(value.target.value);
    setEditCaraPembayaran(value.target.value);
  };
  const handleInputChangeEdit = (event) => {
    setEditBuktiPembayaran(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  const onChangeEditWaktuBatas = (date, dateString) => {
    console.log(dateString);
    setEditWaktuBatas(dateString);
  };

  const handleOkEdit = async () => {
    setConfirmLoadingEdit(true);
    if (
      editTanggalPembelian === "" ||
      editTanggalPembelian === "" ||
      editTanggalKedaluwarsa === "" ||
      editJumlahKuponTersisa === "" ||
      editStatusKupon === "" ||
      editCaraPembayaran === "" ||
      editWaktuBatas === ""
    ) {
      alert("Semua form harus terisi");
      setConfirmLoadingEdit(false);
    } else {
      const data = new FormData();
      data.append("id_kupon_pelanggan", editIdKuponPelanggan);
      data.append("tanggal_pembelian_kupon", editTanggalPembelian);
      data.append("tanggal_kedaluwarsa", editTanggalKedaluwarsa);
      data.append("jumlah_kupon_tersisa", editJumlahKuponTersisa);
      data.append("status_kupon", editStatusKupon);
      data.append("cara_pembayaran", editCaraPembayaran);
      data.append("waktu_batas_pembayaran", editWaktuBatas);
      data.append("bukti_pembayaran", editBuktiPembayaran);

      let res;
      if (typeof editBuktiPembayaran === "string") {
        console.log("non foto, edit foto adalah string");
        res = await axios.post(
          `${UrlApi}kuponpelanggan/adminUpdateKuponPelangganNoFoto`,
          data
        );
      } else {
        res = await axios.post(
          `${UrlApi}kuponpelanggan/adminUpdateKuponPelanggan`,
          data
        );
      }
      console.log(res);
      if (res.data.status === "success") {
        alert("Data Kupon Pelanggan Berhasil Diubah");
      } else {
        alert("Data Kupon Pelanggan Tidak Berhasil Diubah");
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
          <Table dataSource={dataState} columns={columns}></Table>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div>
      <DrawerComponents title="Tabel Kupon Pelanggan" content={content} />

      {/* foto modal */}
      <Modal
        title="Bukti Pembayaran"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <img
          src={`${UrlApi}assets/UploadBuktiPembayaran/${selectedGambar}`}
          style={{ width: "100%" }}
          alt=""
        />
      </Modal>

      {/* edit modal */}
      <Modal
        title="Edit Kupon Pelanggan"
        visible={isEditModalVisible}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        {selectedKey >= 0 && dataState ? (
          <div>
            <h4>ID Kupon Pelanggan</h4>
            <p>{editIdKuponPelanggan}</p>
            <WhiteSpace />
            <h4>Pelanggan</h4>
            <p>{editPelanggan}</p>
            <WhiteSpace />
            <h4>Paket Kupon</h4>
            <p>{editPaketKupon}</p>
            <WhiteSpace />
            <h4>Tanggal Pembelian</h4>
            <DatePicker
              defaultValue={moment(editTanggalPembelian, "YYYY-MM-DD")}
              onChange={onChangeEditTanggalPembelian}
            />
            <WhiteSpace />
            <h4>Tanggal Kedaluwarsa</h4>
            <DatePicker
              defaultValue={moment(editTanggalKedaluwarsa, "YYYY-MM-DD")}
              onChange={onChangeEditTanggalKedaluwarsa}
            />
            <WhiteSpace />
            <h4>Jumlah Kupon Tersisa</h4>
            <InputItem
              value={editJumlahKuponTersisa}
              onChange={onChangeEditJumlahKuponTersisa}
              type="number"
              placeholder="e.g: 6"
            ></InputItem>
            <WhiteSpace />
            <h4>Status Kupon</h4>
            <Radio.Group
              buttonStyle="solid"
              value={editStatusKupon}
              onChange={onChangeEditStatusKupon}
            >
              <Radio.Button value="belum_dibayar">Belum Dibayar</Radio.Button>
              <Radio.Button value="menunggu_dibayar">
                Menunggu Dibayar
              </Radio.Button>
              <Radio.Button value="sudah_dibayar">Sudah Dibayar</Radio.Button>
              <Radio.Button value="gagal_dibayar">Gagal Dibayar</Radio.Button>
            </Radio.Group>
            <WhiteSpace />
            <h4>Cara Pembayaran</h4>
            <Radio.Group
              buttonStyle="solid"
              value={editCaraPembayaran}
              onChange={onChangeEditCaraPembayaran}
            >
              <Radio.Button value="ovo">Ovo</Radio.Button>
              <Radio.Button value="gopay">Gopay</Radio.Button>
              <Radio.Button value="dana">Dana</Radio.Button>
              <Radio.Button value="link_aja">LinkAja</Radio.Button>
              <Radio.Button value="bni">Bni</Radio.Button>
              <Radio.Button value="jenius">Jenius</Radio.Button>
            </Radio.Group>
            <WhiteSpace />
            <h4>Waktu Batas Pembayaran</h4>
            <DatePicker
              defaultValue={moment(editWaktuBatas, "YYYY-MM-DD hh:mm:ss")}
              showTime
              onChange={onChangeEditWaktuBatas}
            />
            <WhiteSpace />
            <h4>Unggah Bukti Pembayaran</h4>
            <img
              src={`${UrlApi}assets/UploadBuktiPembayaran/${editBuktiPembayaran}`}
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
export default TabelKuponPelanggan;
