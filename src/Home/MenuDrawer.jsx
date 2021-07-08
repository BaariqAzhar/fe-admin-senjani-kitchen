import { Drawer, Button, Radio, Space } from "antd";
import { useState } from "react";

import burgerIcon from "./burger.svg";

function MenuDrawer(props) {
  const [visible, setVisble] = useState(false);
  // state = { visible: false, placement: "left" };

  const showDrawer = () => {
    setVisble(true);
  };

  const onClose = () => {
    setVisble(false);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <img
          onClick={showDrawer}
          style={{ width: "30px", marginLeft: "10px", marginRight: "10px" }}
          src={burgerIcon}
          alt=""
        />
        <h1 style={{ marginTop: "10px" }}>{props.title}</h1>
      </div>
      <div>{props.content}</div>
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        key="left"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}

export default MenuDrawer;
