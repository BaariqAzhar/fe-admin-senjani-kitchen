const jenisNasiColor = (jenis_nasi) => {
  if (jenis_nasi === "nasi_merah") {
    return "#f50";
  } else if (jenis_nasi === "nasi_putih") {
    return "#2db7f5";
  } else if (jenis_nasi === "tanpa_nasi") {
    return "#87d068";
  } else {
    return "";
  }
};
export default jenisNasiColor;
