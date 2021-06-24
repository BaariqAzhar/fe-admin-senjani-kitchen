import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./Auth/Login";
import TabelJadwalMenu from "./TabelJadwalMenu/TabelJadwalMenu";
import TabelPelanggan from "./TabelPelanggan/TabelPelanggan";
import TabelPaketKupon from "./TabelPaketKupon/TabelPaketKupon";
import TabelKuponPelanggan from "./TabelKuponPelanggan/TabelKuponPelanggan";
import TabelPesanan from "./TabelPesanan/TabelPesanan";
import BuktiPembayaran from "./BuktiPembayaran/BuktiPembayaran";
import Pengaturan from "./Pengaturan/Pengaturan";

import Coba from "./Coba";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Coba">
          <Coba />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/TabelJadwalMenu">
          <TabelJadwalMenu />
        </Route>
        <Route path="/TabelPelanggan">
          <TabelPelanggan />
        </Route>
        <Route path="/TabelPaketKupon">
          <TabelPaketKupon />
        </Route>
        <Route path="/TabelKuponPelanggan">
          <TabelKuponPelanggan />
        </Route>
        <Route path="/TabelPesanan">
          <TabelPesanan />
        </Route>
        <Route path="/BuktiPembayaran">
          <BuktiPembayaran />
        </Route>
        <Route path="/Pengaturan">
          <Pengaturan />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
