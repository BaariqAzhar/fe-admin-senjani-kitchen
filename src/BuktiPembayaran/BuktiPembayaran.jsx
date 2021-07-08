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
  Tag,
  Button,
  Space,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import NumberFormat from "react-number-format";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import DrawerComponents from "../Home/DrawerComponents";
import MenuDrawer from "../Home/MenuDrawer";
import UrlApi from "../UrlApi";
import waktuMenu from "../Function/waktuMenu";
import jenisPaketKupon from "../Function/jenisPaketKupon";
import jenisPaketKuponColor from "../Function/jenisPaketKuponColor";
import statusKupon from "../Function/statusKupon";
import caraPembayaran from "../Function/caraPembayaran";
import caraPembayaranColor from "../Function/caraPembayaranColor";

function BuktiPembayaran() {
  const qs = require("qs");
  let history = useHistory();

  useEffect(() => {
    return history.listen(() => {
      // listen
      if (history.action === "POP") {
        history.replace("/BuktiPembayaran");
      }
    });
  }, [history]);

  const [dataState, setDataState] = useState([]);
  const processApiBuktiPembayaran = () => {
    axios
      .post(`${UrlApi}mix/showBuktiPembayaranStatusMenungguDiverifikasi`)
      .then((respone) => setDataState(respone.data));
  };
  useEffect(() => {
    processApiBuktiPembayaran();
  }, []);
  useEffect(() => {
    console.log(dataState);
  }, [dataState]);

  const columns = [
    {
      title: "Tanggal Pembelian",
      dataIndex: "tanggal_pembelian_kupon",
      width: 20,
      ...getColumnSearchProps("tanggal_pembelian_kupon"),
      sorter: (a, b) =>
        new Date(a.tanggal_pembelian_kupon) -
        new Date(b.tanggal_pembelian_kupon),
    },
    {
      title: "Jenis Paket Kupon",
      dataIndex: "jenis_paket_kupon",
      // render: (text) => <p>{jenisPaketKupon(text)}</p>,
      render: (text) => (
        <Tag color={jenisPaketKuponColor(text)}>{jenisPaketKupon(text)}</Tag>
      ),
      width: 30,
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
      title: "Harga",
      dataIndex: "harga",
      width: 30,
      // render: (text) => <p>{text}</p>,
      render: (text) => (
        <NumberFormat
          value={text}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rp"}
        />
      ),
      sorter: (a, b) => a.harga - b.harga,
    },
    {
      title: "Nama",
      dataIndex: "nama_lengkap",
      ...getColumnSearchProps("nama_lengkap"),
      sorter: (a, b) => a.nama_lengkap.localeCompare(b.nama_lengkap),
    },
    {
      title: "No HP (Whatsapp)",
      dataIndex: "no_hp_wa",
      width: 30,
      ...getColumnSearchProps("no_hp_wa"),
      sorter: (a, b) => a.no_hp_wa.localeCompare(b.no_hp_wa),
    },
    {
      title: "Periksa",
      dataIndex: "id_kupon_pelanggan",
      width: 100,
      render: (idKuponPelanggan) => (
        <Button
          type="primary"
          onClick={() => {
            showEditModal(idKuponPelanggan);
          }}
          block
        >
          Periksa
        </Button>
      ),
    },
  ];

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

    setIdKuponPelanggan(dataState[result].id_kupon_pelanggan);

    setIsEditModalVisible(true);
  };
  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const [idKuponPelanggan, setIdKuponPelanggan] = useState("");
  const [statusKupon, setStatusKupon] = useState("");
  const onChangeStatusKupon = (value) => {
    console.log(value.target.value);
    setStatusKupon(value.target.value);
  };

  const handleOkEdit = async () => {
    setConfirmLoadingEdit(true);
    if (statusKupon === "") {
      alert("Valid / Tidak Valid Bukti Pembayan Belum Terpilih");
      setConfirmLoadingEdit(false);
    } else {
      const keyValue = {
        id_kupon_pelanggan: idKuponPelanggan,
        status_kupon: statusKupon,
      };
      console.log(keyValue);

      const res = await axios.post(
        `${UrlApi}kuponpelanggan/adminUpdateKuponPelangganNoFoto`,
        qs.stringify(keyValue)
      );
      console.log(res);
      if (res.data.status === "success") {
        if (statusKupon === "sudah_dibayar") {
          alert("Proses Berhasil, Bukti Pembayaran Valid/ Asli / Cocok");
        } else if (statusKupon === "gagal_dibayar") {
          alert("Proses Berhasil, Bukti Pembayaran Tidak Valid/ Beda");
        }
      } else {
        alert("Proses Verifikasi Gagal");
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
      <DrawerComponents title="Verifikasi Bukti Pembayaran" content={content} />
      {/* <MenuDrawer title="Bukti Pembayaran" content={content} /> */}

      {/* edit modal */}
      <Modal
        title="Periksa Bukti Pembayaran"
        visible={isEditModalVisible}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        {selectedKey >= 0 && dataState ? (
          <div>
            <h4>Tanggal Pembelian</h4>
            <p>{dataState[selectedKey].tanggal_pembelian_kupon}</p>
            <WhiteSpace />
            <h4>Cara Pembayaran</h4>
            <p>{caraPembayaran(dataState[selectedKey].cara_pembayaran)}</p>
            <WhiteSpace />
            <h4>Harga</h4>
            <p>
              <NumberFormat
                value={dataState[selectedKey].harga}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp"}
              />
            </p>
            <WhiteSpace />
            <h4>Nama</h4>
            <p>{dataState[selectedKey].nama_lengkap}</p>
            <WhiteSpace />
            <img
              src={`${UrlApi}assets/UploadBuktiPembayaran/${dataState[selectedKey].bukti_pembayaran}`}
              style={{ width: "100%" }}
              alt=""
            />
            <WhiteSpace />
            <h4>Periksa</h4>
            <Radio.Group buttonStyle="solid" onChange={onChangeStatusKupon}>
              <Radio.Button value="sudah_dibayar">
                Valid/ Asli/ Cocok
              </Radio.Button>
              <Radio.Button value="gagal_dibayar">
                Tidak Valid/ Beda
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
export default BuktiPembayaran;
