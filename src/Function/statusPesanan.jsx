// * 'belum_dikirim','sudah_dikirim','gagal_dikirim','pesanan_dibatalkan'
const statusPesanan = (status_pesanan) => {
  if (status_pesanan === "belum_dikirim") {
    return "Belum dikirim";
  } else if (status_pesanan === "sudah_dikirim") {
    return "Sudah dikirim";
  } else if (status_pesanan === "gagal_dikirim") {
    return "Gagal dikirim";
  } else if (status_pesanan === "pesanan_dibatalkan") {
    return "Pesanan dibatalkan";
  } else {
    return "";
  }
};
export default statusPesanan;
