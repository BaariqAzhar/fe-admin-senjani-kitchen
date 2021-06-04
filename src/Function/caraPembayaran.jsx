const caraPembayaran = (cara_pembayaran) => {
  // * 'ovo','gopay','dana','link_aja','bni','jenius'
  if (cara_pembayaran === "ovo") {
    return "Ovo";
  } else if (cara_pembayaran === "gopay") {
    return "Gopay";
  } else if (cara_pembayaran === "dana") {
    return "Dana";
  } else if (cara_pembayaran === "link_aja") {
    return "LinkAja";
  } else if (cara_pembayaran === "bni") {
    return "Bank BNI";
  } else if (cara_pembayaran === "jenius") {
    return "Jenius / Bank BPTN";
  } else {
    return "";
  }
};
export default caraPembayaran;
