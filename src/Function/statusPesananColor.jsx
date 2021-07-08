// * 'belum_dikirim','sudah_dikirim','gagal_dikirim','pesanan_dibatalkan'
const statusPesananColor = (status_pesanan) => {
  if (status_pesanan === "belum_dikirim") {
    return "red";
  } else if (status_pesanan === "sudah_dikirim") {
    return "green";
  } else if (status_pesanan === "gagal_dikirim") {
    return "geekblue";
  } else if (status_pesanan === "pesanan_dibatalkan") {
    return "purple";
  } else {
    return "";
  }
};
export default statusPesananColor;
