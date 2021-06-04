const transferKe = (cara_pembayaran) => {
  // * 'ovo','gopay','dana','link_aja','bni','jenius'
  if (cara_pembayaran === "ovo") {
    return "0812345678910";
  } else if (cara_pembayaran === "gopay") {
    return "0812345678910";
  } else if (cara_pembayaran === "dana") {
    return "0812345678910";
  } else if (cara_pembayaran === "link_aja") {
    return "0812345678910";
  } else if (cara_pembayaran === "bni") {
    return "847638653";
  } else if (cara_pembayaran === "jenius") {
    return "$senjanikitchen / 65367134875";
  } else {
    return "";
  }
};
export default transferKe;
