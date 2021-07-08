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
  Space,
  Tag,
  Button,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import NumberFormat from "react-number-format";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import DrawerComponents from "../Home/DrawerComponents";
import UrlApi from "../UrlApi";
import jenisNasi from "../Function/jenisNasi";
import jenisNasiColor from "../Function/jenisNasiColor";
import jenisPaketKupon from "../Function/jenisPaketKupon";
import jenisPaketKuponColor from "../Function/jenisPaketKuponColor";
import laukTambahan from "../Function/laukTambahan";
import IsLogin from "../Auth/IsLogin";
import editImg from "./edit.svg";

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
      title: "Kode Paket Kupon",
      dataIndex: "kode_paket_kupon",
      ...getColumnSearchProps("kode_paket_kupon"),
      sorter: (a, b) => a.kode_paket_kupon.localeCompare(b.kode_paket_kupon),
    },
    {
      title: "Jumlah Kupon",
      dataIndex: "jumlah_kupon",
      ...getColumnSearchProps("jumlah_kupon"),
      sorter: (a, b) => a.jumlah_kupon - b.jumlah_kupon,
    },
    {
      title: "Harga",
      dataIndex: "harga",
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
    //   title: "Lauk Tambahan",
    //   dataIndex: "lauk_tambahan",
    //   render: (text) => <p>{laukTambahan(text)}</p>,
    //   filters: [
    //     {
    //       text: "Ada",
    //       value: "ada",
    //     },
    //     {
    //       text: "Tidak Ada",
    //       value: "tidak_ada",
    //     },
    //   ],
    //   onFilter: (value, record) => record.lauk_tambahan.indexOf(value) === 0,
    // },
    {
      title: "Edit",
      dataIndex: "id_paket_kupon",
      width: "100px",
      render: (idPaketKupon) => (
        <Button
          type="primary"
          onClick={() => {
            showEditModal(idPaketKupon);
          }}
        >
          <img src={editImg} alt="" /> Edit
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
          <Table columns={columns} dataSource={dataState} />
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div>
      <IsLogin />
      <DrawerComponents title="Tabel Paket Kupon" content={content} />
      <Modal
        title="Edit Menu"
        visible={isEditModalVisible}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        {dataState ? (
          <div>
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
            <h4>Harga (Rp)</h4>
            <InputItem
              value={editHarga}
              onChange={onChangeEditHarga}
              type="number"
              placeholder="e.g: 48000"
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
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
}
export default TabelPaketKupon;
