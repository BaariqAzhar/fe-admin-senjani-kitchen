// *'pagi','siang','sore'
const waktuMenu = (waktu_menu) => {
  if (waktu_menu === "pagi") {
    return "Pagi";
  } else if (waktu_menu === "siang") {
    return "Siang";
  } else if (waktu_menu === "sore") {
    return "Sore";
  } else {
    return "";
  }
};
export default waktuMenu;
