// *'belum_dibayar','menunggu_dibayar','sudah_dibayar','gagal_dibayar'
const statusKuponColor = (status_pesanan) => {
  if (status_pesanan === "belum_dibayar") {
    return "#A20B0B";
  } else if (status_pesanan === "menunggu_diverifikasi") {
    return "#195BDB";
  } else if (status_pesanan === "sudah_dibayar") {
    return "#1FAE98";
  } else if (status_pesanan === "gagal_dibayar") {
    return "#810101";
  } else {
    return "";
  }
};
export default statusKuponColor;
