import { WhiteSpace, Card, InputItem } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import axios from "axios";
import { useState, useEffect, useDebugValue } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Table,
  Modal,
  DatePicker,
  Radio,
  Input,
  Form,
  Button,
  Space,
  Tag,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import DrawerComponents from "../Home/DrawerComponents";
import UrlApi from "../UrlApi";
import waktuMenu from "../Function/waktuMenu";
import jenisPaketKupon from "../Function/jenisPaketKupon";
import jenisPaketKuponColor from "../Function/jenisPaketKuponColor";
import statusKupon from "../Function/statusKupon";
import statusPesananColor from "../Function/statusPesananColor";
import statusKuponColor from "../Function/statusKuponColor";
import caraPembayaran from "../Function/caraPembayaran";
import caraPembayaranColor from "../Function/caraPembayaranColor";
import IsLogin from "../Auth/IsLogin";
import imgImg from "./img.svg";
import editImg from "./edit.svg";
import jenisNasi from "../Function/jenisNasi";
import jenisNasiColor from "../Function/jenisNasiColor";

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
      title: "Nama",
      dataIndex: "nama_lengkap",
      ...getColumnSearchProps("nama_lengkap"),
      sorter: (a, b) => a.nama_lengkap.localeCompare(b.nama_lengkap),
    },
    {
      title: "Status Kupon",
      dataIndex: "status_kupon",
      render: (text) => (
        <Tag color={statusKuponColor(text)}>{statusKupon(text)}</Tag>
      ),
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
      title: "Jenis Paket Kupon",
      dataIndex: "jenis_paket_kupon",
      width: 20,
      render: (text) => (
        <Tag color={jenisPaketKuponColor(text)}>{jenisPaketKupon(text)}</Tag>
      ),
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
      title: "Jenis Nasi",
      dataIndex: "jenis_nasi",
      // render: (text) => <p>{jenisNasi(text)}</p>,
      render: (text) => (
        <Tag color={jenisNasiColor(text)}>{jenisNasi(text)}</Tag>
      ),
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
    // {
    //   title: "Kode",
    //   dataIndex: "kode_paket_kupon",
    //   ...getColumnSearchProps("kode_paket_kupon"),
    //   sorter: (a, b) => a.kode_paket_kupon.localeCompare(b.kode_paket_kupon),
    // },
    {
      title: "Sisa Kupon",
      dataIndex: "jumlah_kupon_tersisa",
      width: "100px",
      ...getColumnSearchProps("tanggal_kedaluwarsa"),
      sorter: (a, b) => a.jumlah_kupon_tersisa - b.jumlah_kupon_tersisa,
    },
    {
      title: "Cara Pembayaran",
      dataIndex: "cara_pembayaran",
      // render: (text) => <p>{caraPembayaran(text)}</p>,
      render: (text) => (
        <Tag color={caraPembayaranColor(text)}>{caraPembayaran(text)}</Tag>
      ),
      width: 30,
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
      width: "100px",
      render: (buktiPembayaran) => (
        <Button
          onClick={() => {
            showModal(buktiPembayaran);
          }}
          type="primary"
        >
          <img src={imgImg} alt="" />
        </Button>
      ),
    },
    {
      title: "Tanggal Kedaluwarsa",
      dataIndex: "tanggal_kedaluwarsa",
      ...getColumnSearchProps("tanggal_kedaluwarsa"),
      sorter: (a, b) =>
        new Date(a.tanggal_kedaluwarsa) - new Date(b.tanggal_kedaluwarsa),
    },
    {
      title: "Edit",
      dataIndex: "id_kupon_pelanggan",
      width: "100px",
      render: (idKuponPelanggan) => (
        <Button
          type="primary"
          onClick={() => {
            showEditModal(idKuponPelanggan);
          }}
        >
          <img src={editImg} alt="" /> Edit
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
      console.log(editBuktiPembayaran);
      if (
        typeof editBuktiPembayaran === "string" ||
        editBuktiPembayaran === null
      ) {
        console.log("non foto, edit foto adalah string");
        res = await axios.post(
          `${UrlApi}kuponpelanggan/adminUpdateKuponPelangganNoFoto`,
          data
        );
        console.log(res);
        if (res.data.status === "success") {
          alert("Data Kupon Pelanggan Berhasil Diubah");
        } else {
          alert("Data Kupon Pelanggan Tidak Berhasil Diubah");
        }
        setConfirmLoadingEdit(false);
        setIsEditModalVisible(false);
        window.location.reload(false);
      } else {
        if (editBuktiPembayaran.type.includes("image")) {
          res = await axios.post(
            `${UrlApi}kuponpelanggan/adminUpdateKuponPelanggan`,
            data
          );
          console.log(res);
          if (res.data.status === "success") {
            alert("Data Kupon Pelanggan Berhasil Diubah");
          } else {
            alert("Data Kupon Pelanggan Tidak Berhasil Diubah");
          }
          setConfirmLoadingEdit(false);
          setIsEditModalVisible(false);
          window.location.reload(false);
        } else {
          alert(
            "Edit Menu Gagal, Foto Menu Harus Berbentuk Gambar (jpg, png, dll)"
          );
        }
      }
    }
  };

  // ! search components
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   this.searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }
  // ! search end

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
      <IsLogin />
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
            {/* <h4>Pelanggan</h4>
            <p>{editPelanggan}</p>
            <WhiteSpace />
            <h4>Paket Kupon</h4>
            <p>{editPaketKupon}</p>
            <WhiteSpace /> */}
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
              <Radio.Button value="menunggu_diverifikasi">
                Menunggu Diverifikasi
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
