import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

function IsLogin() {
  let history = useHistory();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));

  const goToLogin = () => {
    if (isLogin === "true") {
      console.log("login true");
    } else {
      history.push("/Login");
    }
  };

  useEffect(() => {
    goToLogin();
  }, [isLogin]);

  return <div></div>;
}
export default IsLogin;
