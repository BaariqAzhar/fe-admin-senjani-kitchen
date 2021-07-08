// *'pagi','siang','sore'
const waktuMenuColor = (waktu_menu) => {
  if (waktu_menu === "pagi") {
    return "#00B300";
  } else if (waktu_menu === "siang") {
    return "#EEB600";
  } else if (waktu_menu === "sore") {
    return "#595959";
  } else {
    return "";
  }
};
export default waktuMenuColor;
