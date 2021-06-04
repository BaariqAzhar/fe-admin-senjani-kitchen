const jenisNasi = (jenis_nasi) => {
  if (jenis_nasi === "nasi_merah") {
    return "Nasi merah";
  } else if (jenis_nasi === "nasi_putih") {
    return "Nasi putih";
  } else if (jenis_nasi === "tanpa_nasi") {
    return "Tanpa nasi";
  } else {
    return "";
  }
};
export default jenisNasi;
