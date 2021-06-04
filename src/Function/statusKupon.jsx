// *'belum_dibayar','menunggu_dibayar','sudah_dibayar','gagal_dibayar'
const statusKupon = (status_pesanan) => {
  if (status_pesanan === "belum_dibayar") {
    return "Belum dibayar";
  } else if (status_pesanan === "menunggu_dibayar") {
    return "Menunggu dibayar";
  } else if (status_pesanan === "sudah_dibayar") {
    return "Sudah dibayar";
  } else if (status_pesanan === "gagal_dibayar") {
    return "gagal_dibayar";
  } else {
    return "";
  }
};
export default statusKupon;
