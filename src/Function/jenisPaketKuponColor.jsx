const jenisPaketKuponColor = (jenis_paket_kupon) => {
  if (jenis_paket_kupon === "basic_meal_box") {
    return "cyan";
  } else if (jenis_paket_kupon === "reusable_meal_box") {
    return "green";
  } else if (jenis_paket_kupon === "deluxe_meal_box") {
    return "gold";
  } else if (jenis_paket_kupon === "couple_pack") {
    return "purple";
  } else if (jenis_paket_kupon === "family_pack") {
    return "red";
  } else {
    return "";
  }
};
export default jenisPaketKuponColor;
