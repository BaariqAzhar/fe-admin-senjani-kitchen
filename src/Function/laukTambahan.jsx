const laukTambahan = (lauk_tambahan) => {
  if (lauk_tambahan === "ada") {
    return "Ada";
  } else if (lauk_tambahan === "tidak_ada") {
    return "Tidak Ada";
  } else {
    return "";
  }
};
export default laukTambahan;
