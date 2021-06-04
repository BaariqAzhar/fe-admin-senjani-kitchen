const jenisPaketKupon = (jenis_paket_kupon) => {
  if (jenis_paket_kupon === "basic_meal_box") {
    return "Basic Meal Box";
  } else if (jenis_paket_kupon === "reusable_meal_box") {
    return "Reusable Meal Box";
  } else if (jenis_paket_kupon === "deluxe_meal_box") {
    return "Deluxe Meal Box";
  } else if (jenis_paket_kupon === "couple_pack") {
    return "Couple Pack";
  } else if (jenis_paket_kupon === "family_pack") {
    return "Family Pack";
  } else {
    return "";
  }
};
export default jenisPaketKupon;
