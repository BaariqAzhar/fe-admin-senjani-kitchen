import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./Auth/Login";
import BaseTabelJadwalMenu from "./TabelJadwalMenu/BaseTabelJadwalMenu";
import TabelJadwalMenu from "./TabelJadwalMenu/TabelJadwalMenu";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/TabelJadwalMenu">
          <TabelJadwalMenu />
        </Route>
        <Route path="/TabelJadwalMenu1">
          <BaseTabelJadwalMenu />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
