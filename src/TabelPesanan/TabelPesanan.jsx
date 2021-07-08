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
  Space,
  Tag,
  Button,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import DrawerComponents from "../Home/DrawerComponents";
import UrlApi from "../UrlApi";
import waktuMenu from "../Function/waktuMenu";
import waktuMenuColor from "../Function/waktuMenuColor";
import jenisPaketKupon from "../Function/jenisPaketKupon";
import jenisPaketKuponColor from "../Function/jenisPaketKuponColor";
import statusKupon from "../Function/statusKupon";
import statusPesanan from "../Function/statusPesanan";
import statusPesananColor from "../Function/statusPesananColor";
import caraPembayaran from "../Function/caraPembayaran";
import IsLogin from "../Auth/IsLogin";
import editImg from "./edit.svg";
import editBlueImg from "./editBlue.svg";
import jenisNasi from "../Function/jenisNasi";
import jenisNasiColor from "../Function/jenisNasiColor";

function TabelPesanan() {
  const qs = require("qs");

  const [dataState, setDataState] = useState([]);
  const processApiShowAllPesanan = () => {
    axios
      .post(`${UrlApi}mix/showAllPesanan`)
      .then((respone) => setDataState(respone.data));
  };
  useEffect(() => {
    processApiShowAllPesanan();
  }, []);
  useEffect(() => {
    console.log(dataState);
  }, [dataState]);

  const columns = [
    {
      title: "Tanggal",
      dataIndex: "tanggal_menu",
      width: 20,
      ...getColumnSearchProps("tanggal_menu"),
      sorter: (a, b) => new Date(a.tanggal_menu) - new Date(b.tanggal_menu),
    },
    {
      title: "Waktu",
      dataIndex: "waktu_menu",
      width: 20,
      render: (text) => (
        <Tag color={waktuMenuColor(text)}>{waktuMenu(text)}</Tag>
      ),
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
      title: "Status Pesanan",
      dataIndex: ["status_pesanan", "id_pesanan"],
      render: (text, row) => (
        <Tag color={statusPesananColor(row["status_pesanan"])}>
          {statusPesanan(row["status_pesanan"])}
        </Tag>
      ),
      filters: [
        {
          text: "Belum Dikirim",
          value: "belum_dikirim",
        },
        {
          text: "Sudah Dikirim",
          value: "sudah_dikirim",
        },
        {
          text: "Gagal Dikirim",
          value: "gagal_dikirim",
        },
        {
          text: "Pesanan Dibatalkan",
          value: "pesanan_dibatalkan",
        },
      ],
      onFilter: (value, record) => record.status_pesanan.indexOf(value) === 0,
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
    {
      title: "Nama Penerima",
      dataIndex: "nama_penerima",
      ...getColumnSearchProps("nama_penerima"),
      sorter: (a, b) => a.nama_penerima.localeCompare(b.nama_penerima),
    },
    {
      title: "No HP (Whatsapp)",
      dataIndex: "no_hp_wa_penerima",
      ...getColumnSearchProps("no_hp_wa_penerima"),
      sorter: (a, b) => a.no_hp_wa_penerima.localeCompare(b.no_hp_wa_penerima),
    },
    {
      title: "Alamat Penerima",
      dataIndex: "alamat_penerima",
      ...getColumnSearchProps("alamat_penerima"),
      sorter: (a, b) => a.alamat_penerima.localeCompare(b.alamat_penerima),
    },
    {
      title: "Catatan Makanan Penerima",
      dataIndex: "alergi_makanan_penerima",
      ...getColumnSearchProps("alergi_makanan_penerima"),
      sorter: (a, b) =>
        a.alergi_makanan_penerima.localeCompare(b.alergi_makanan_penerima),
    },
    {
      title: "Catatan Pengantaran",
      dataIndex: "catatan_pesanan",
      ...getColumnSearchProps("alergi_makanan_penerima"),
      sorter: (a, b) => a.catatan_pesanan.localeCompare(b.catatan_pesanan),
    },
    {
      title: "Edit",
      dataIndex: "id_pesanan",
      width: "100px",
      render: (idPesanan) => (
        <Button
          type="primary"
          onClick={() => {
            showEditModal(idPesanan);
          }}
        >
          <img src={editImg} alt="" />
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
  const showEditModal = (idPesanan) => {
    processEditState(idPesanan);
    setIsEditModalVisible(true);
  };
  // * digunakan di showEditModal & showEditStatusModal
  const processEditState = (idPesanan) => {
    var result = dataState.findIndex((entry) => entry.id_pesanan === idPesanan);
    setSelectedKey(result);
    console.log(dataState[result]);

    setEditIdPesanan(dataState[result].id_pesanan);
    setEditPelanggan(
      dataState[result].id_pelanggan + ", " + dataState[result].nama_lengkap
    );
    setEditKuponPelanggan(
      dataState[result].id_kupon_pelanggan +
        ", " +
        statusKupon(dataState[result].status_kupon)
    );
    setEditPaketKupon(
      dataState[result].id_paket_kupon +
        ", " +
        dataState[result].kode_paket_kupon +
        ", " +
        jenisPaketKupon(dataState[result].jenis_paket_kupon)
    );
    setEditMenu(
      dataState[result].id_menu +
        ", " +
        dataState[result].tanggal_menu +
        ", " +
        waktuMenu(dataState[result].waktu_menu)
    );
    setEditWaktuPemesanan(dataState[result].waktu_pemesanan);
    setEditNama(dataState[result].nama_penerima);
    setEditNoHpWa(dataState[result].no_hp_wa_penerima);
    setEditAlamat(dataState[result].alamat_penerima);
    setEditCatatanMakanan(dataState[result].alergi_makanan_penerima);
    setEditCatatanPengantaran(dataState[result].catatan_pesanan);
    setEditStatusPemesanan(dataState[result].status_pesanan);
  };
  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const [editIdPesanan, setEditIdPesanan] = useState("");
  const [editPelanggan, setEditPelanggan] = useState("");
  // ! pelanggan, kupon pelang, paket kupon, menu
  // ! waktu pemesanan, nama penerima, no HP WA, alamat, catatan makanan, catatan pengantaran, status pemesanan
  const [editKuponPelanggan, setEditKuponPelanggan] = useState("");
  const [editPaketKupon, setEditPaketKupon] = useState("");
  const [editMenu, setEditMenu] = useState("");
  const [editWaktuPemesanan, setEditWaktuPemesanan] = useState("");
  const [editNama, setEditNama] = useState("");
  const [editNoHpWa, setEditNoHpWa] = useState("");
  const [editAlamat, setEditAlamat] = useState("");
  const [editCatatanMakanan, setEditCatatanMakanan] = useState("");
  const [editCatatanPengantaran, setEditCatatanPengantaran] = useState("");
  const [editStatusPemesanan, setEditStatusPemesanan] = useState("");
  const onChangeEditWaktuPemesanan = (date, dateString) => {
    console.log(dateString);
    setEditWaktuPemesanan(dateString);
  };
  const onChangeEditNama = (value) => {
    setEditNama(value.target.value);
  };
  const onChangeEditNoHpWa = (value) => {
    setEditNoHpWa(value);
  };
  const onChangeEditAlamat = (value) => {
    setEditAlamat(value.target.value);
  };
  const onChangeEditCatatanMakanan = (value) => {
    setEditCatatanMakanan(value.target.value);
  };
  const onChangeEditCatatanPengantaran = (value) => {
    setEditCatatanPengantaran(value.target.value);
  };
  const onChangeEditStatusPemesanan = (value) => {
    console.log(value.target.value);
    setEditStatusPemesanan(value.target.value);
  };

  const handleOkEdit = async () => {
    setConfirmLoadingEdit(true);
    if (
      editWaktuPemesanan === "" ||
      editNama === "" ||
      editNoHpWa === "" ||
      editAlamat === "" ||
      editCatatanMakanan === "" ||
      editCatatanPengantaran === "" ||
      editStatusPemesanan === ""
    ) {
      alert("Semua form harus terisi");
      setConfirmLoadingEdit(false);
    } else {
      const keyValue = {
        id_pesanan: editIdPesanan,
        waktu_pemesanan: editWaktuPemesanan,
        nama_penerima: editNama,
        no_hp_wa_penerima: editNoHpWa,
        alamat_penerima: editAlamat,
        alergi_makanan_penerima: editCatatanMakanan,
        catatan_pesanan: editCatatanPengantaran,
        status_pesanan: editStatusPemesanan,
      };
      console.log(keyValue);
      const res = await axios.post(
        `${UrlApi}pesanan/adminUpdatePesanan`,
        qs.stringify(keyValue)
      );
      console.log(res);
      if (res.data.status === "success") {
        alert("Data Pesanan Berhasil Diubah");
      } else {
        alert("Data Pesanan Tidak Berhasil Diubah");
      }
      setConfirmLoadingEdit(false);
      setIsEditModalVisible(false);
      window.location.reload(false);
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
      <DrawerComponents title="Tabel Pesanan" content={content} />

      {/* edit modal */}
      <Modal
        title="Edit Pesanan"
        visible={isEditModalVisible}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        {selectedKey >= 0 && dataState ? (
          <div>
            {/* <h4>ID Pesanan</h4>
            <p>{editIdPesanan}</p>
            <WhiteSpace />
            <h4>Pelanggan</h4>
            <p>{editPelanggan}</p>
            <WhiteSpace />
            <h4>Kupon Pelanggan</h4>
            <p>{editKuponPelanggan}</p>
            <WhiteSpace />
            <h4>Paket Kupon</h4>
            <p>{editPaketKupon}</p>
            <WhiteSpace />
            <h4>Menu</h4>
            <p>{editMenu}</p>
            <WhiteSpace />
            <h4>Waktu Pemesanan</h4>
            <DatePicker
              defaultValue={moment(editWaktuPemesanan, "YYYY-MM-DD hh:mm:ss")}
              showTime
              onChange={onChangeEditWaktuPemesanan}
            />
            <WhiteSpace /> */}
            <h4>Nama Penerima</h4>
            <Input.TextArea
              value={editNama}
              onChange={onChangeEditNama}
              placeholder="e.g: Baariq Azhar"
              autoSize
            />
            <WhiteSpace />
            <h4>No HP Penerima (WA)</h4>
            <InputItem
              value={editNoHpWa}
              onChange={onChangeEditNoHpWa}
              type="number"
              placeholder="e.g: 08123456789"
            ></InputItem>
            <WhiteSpace />
            <h4>Alamat Penerima</h4>
            <Input.TextArea
              value={editAlamat}
              onChange={onChangeEditAlamat}
              placeholder="e.g: Jl. Candi 2C No.557 (Kos Rahman 99), 
              Karangbesuki, Kec. Sukun, Kota Malang"
              autoSize
            />
            <WhiteSpace />
            <h4>Catatan Makanan Penerima</h4>
            <Input.TextArea
              value={editCatatanMakanan}
              onChange={onChangeEditCatatanMakanan}
              placeholder="e.g: tidak suka pedas"
              autoSize
            />
            <WhiteSpace />
            <h4>Catatan Pengantaran</h4>
            <Input.TextArea
              value={editCatatanPengantaran}
              onChange={onChangeEditCatatanPengantaran}
              placeholder="e.g: TItip disatpam depan"
              autoSize
            />
            <WhiteSpace />
            <h4>Status Pesanan</h4>
            <Radio.Group
              buttonStyle="solid"
              value={editStatusPemesanan}
              onChange={onChangeEditStatusPemesanan}
            >
              <Radio.Button value="belum_dikirim">Belum Dikirim</Radio.Button>
              <Radio.Button value="sudah_dikirim">Sudah Dikirim</Radio.Button>
              <Radio.Button value="gagal_dikirim">Gagal Dikirim</Radio.Button>
              <Radio.Button value="pesanan_dibatalkan">
                Pesanan Dibatalkan
              </Radio.Button>
            </Radio.Group>
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
}
export default TabelPesanan;
