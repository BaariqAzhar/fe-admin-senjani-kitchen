const caraPembayaranColor = (cara_pembayaran) => {
  // * 'ovo','gopay','dana','link_aja','bni','jenius'
  if (cara_pembayaran === "ovo") {
    return "#39286F";
  } else if (cara_pembayaran === "gopay") {
    return "#00A512";
  } else if (cara_pembayaran === "dana") {
    return "#1967C4";
  } else if (cara_pembayaran === "link_aja") {
    return "#E12428";
  } else if (cara_pembayaran === "bni") {
    return "#F74501";
  } else if (cara_pembayaran === "jenius") {
    return "#01A6E2";
  } else {
    return "";
  }
};
export default caraPembayaranColor;
